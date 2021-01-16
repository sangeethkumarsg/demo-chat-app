import { Injectable } from "@angular/core";
import { FireStoreService } from './firestore.service';
import { COLLECTION_ROOTS, CHAT_STATUS, CHAT_TYPES,CHAT_MEDIA_TYPE, SUB_COLLECTIONS } from '../constants/firestore.constant';
import { MediaUploadService } from './media-upload.service';
import { CommonUtilities } from "../utilities/common.utilities";
import * as _ from 'lodash';
import { CommonLoaderService } from '../common-loader/common-loader.service';

@Injectable({
    'providedIn':'root'
})
export class ChatService {
    constructor(
        private _firestoreService: FireStoreService,
        private _mediaUploadService: MediaUploadService,
        private _commomLoaderService: CommonLoaderService
    ){}

    getChatByUserId(userId:string){
        return this._firestoreService.queryCollection(COLLECTION_ROOTS.CHAT,[
            {
                'field': 'participants',
                'condition': 'array-contains',
                'value': userId
            }
        ])
    }

    startChat(participants:string[]){
        return this._firestoreService.addToCollection(COLLECTION_ROOTS.CHAT,{
            "chatStartedTime": new Date().toISOString(),
            "lastUpdatedTime": new Date().toISOString(),
            "participants": participants,
            "status": CHAT_STATUS.ACTIVE,
            "chatType": participants.length > 2 ? CHAT_TYPES.GROUP : CHAT_TYPES.PRIVATE
        })
    }

    async uploadMediaInChat(chatId:string, sender:string, medias:any[]){
        this._commomLoaderService.setLoaderVisible(true);
        const promiseArray = [];
        try{
            for(const media of medias){
                promiseArray.push(this.singleMediaUploadInChat(chatId, sender, media));
            }
            const resp = await Promise.all(promiseArray);
            this._commomLoaderService.setLoaderVisible(false);
            return resp;
        }catch(error){
            console.error('Media upload failed: ',error);
            this._commomLoaderService.setLoaderVisible(false);
            throw error;
        }
        
    }

    private async singleMediaUploadInChat(chatId:string,sender:string, media:any){
        const mediaUrl = (await this._mediaUploadService.uploadChatMedia(media) as string);
        const time = new Date().toISOString();
        const collectionPath = COLLECTION_ROOTS.CHAT + '/' + chatId + '/' + SUB_COLLECTIONS.CHAT_CONTENTS;        
        return this._firestoreService.addToCollection(collectionPath,{
            mediaUrl,
            uploadedTime: time,
            time,
            sender,
            mediaType: CommonUtilities.getMediaType(mediaUrl),
        }); 
    }

    getChatDetails(chatId:string){
        const collectionPath = COLLECTION_ROOTS.CHAT + '/' + chatId + '/' + SUB_COLLECTIONS.CHAT_CONTENTS;
        return this._firestoreService.streamCollectionWithOrderBy(collectionPath,'time');
    }

    getChatMeta(chatId:string){
        return this._firestoreService.getDocValue(COLLECTION_ROOTS.CHAT+ '/'+chatId);
    }

    addTextMessage(chatId:string, userId:string, message:string){
        const time = new Date().toISOString();
        const collectionPath = COLLECTION_ROOTS.CHAT + '/' + chatId + '/' + SUB_COLLECTIONS.CHAT_CONTENTS; 
        return this._firestoreService.addToCollection(collectionPath,{
            time,
            sender:userId,
            message,
            mediaType: "TEXT"
        }); 
    }

    async isChatExists(participants:string[]){
        const q1 = await this._firestoreService.queryCollection(COLLECTION_ROOTS.CHAT,[
            {
                field: 'participants',
                condition: '==',
                value: participants
            }
        ]);
        if(!q1.empty){
            return q1;
        }
        const q2 = await this._firestoreService.queryCollection(COLLECTION_ROOTS.CHAT,[
            {
                field: 'participants',
                condition: '==',
                value: participants.reverse()
            }
        ]);
        return q2;

    }

    async getParticipantsInfoByChatId(chatId:string){
        const chatInfo = await this._firestoreService.getDoc(COLLECTION_ROOTS.CHAT + '/'+chatId).toPromise();
        const participants = chatInfo.participants;
        const usersInfo = await this.getUsersInfo(participants);
        const participantsInfo = {};
        if(usersInfo.size){
            usersInfo.forEach(user => {
                participantsInfo[user.id] = user
            })
        }
        return participantsInfo;
    }

    
    async getUsersInfo(userIdList:string[]){
        return this._firestoreService.queryCollection(COLLECTION_ROOTS.USERS, [{
          'field': 'uid',
          'condition': 'in',
          'value': userIdList
        }]);
    }

    async searchUserByEmail(email:string){
        return this._firestoreService.queryCollection(COLLECTION_ROOTS.USERS,[
            {
                field: 'email',
                condition: '==',
                value: email
            }
        ])
    }

    async getAllUsers(){
        return this._firestoreService.getCollection(COLLECTION_ROOTS.USERS).toPromise();
    }
    

    


}
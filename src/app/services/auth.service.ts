
import { Injectable } from '@angular/core'
import {AngularFireAuth} from '@angular/fire/auth';
import { COLLECTION_ROOTS, UserDoc } from '../constants/firestore.constant';
import { FireStoreService } from './firestore.service';

@Injectable({
    'providedIn': 'root'
})
export class AuthService{
    authState: any = null;
    userData: UserDoc = null;
    constructor(
        private firebaseAuth: AngularFireAuth,
        private firestoreService: FireStoreService
    ) {
        if(this.getUserInfoFromLocalStorage()){
            this.authState = this.getUserInfoFromLocalStorage();
        }
        this.firebaseAuth.authState.subscribe( authState => {
            console.log('Auth state changed: ',authState);
            this.authState = authState;
            localStorage.setItem('_loggedInUserInfo',JSON.stringify(authState));
          });
    }

    get isAuthenticated(): boolean {
        return this.authState !== null;
    }

    get currentUserId(): string {
        this.isAuthenticated
        return this.isAuthenticated ? this.authState.uid : null;
    }

    private getUserInfoFromLocalStorage(){
        return localStorage.getItem('_loggedInUserInfo') ? JSON.parse(localStorage.getItem('_loggedInUserInfo')) : null;
    }

    setUserData(data:any){
        const documentPath = COLLECTION_ROOTS.USERS +'/'+ data.uid;
        const userData:any = {
            uid: data.uid,
            displayName: data.displayName,
            email: data.email,
            lastLoggedInTS: new Date().toISOString()
        };
        this.firestoreService.setDoc(documentPath, userData);
    }
}
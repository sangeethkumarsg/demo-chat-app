
import { Injectable } from '@angular/core'
import {AngularFireAuth} from '@angular/fire/auth';
import { COLLECTION_ROOTS, UserDoc } from '../constants/firestore.constant';
import { FireStoreService } from './firestore.service';

@Injectable({
    'providedIn': 'root'
})
export class AuthService{
    authState: any = null;
    constructor(
        private firebaseAuth: AngularFireAuth,
        private firestoreService: FireStoreService
    ) {
        this.firebaseAuth.authState.subscribe( authState => {
            console.log('Auth state changed: ',authState);
            this.authState = authState;
          });
    }

    get isAuthenticated(): boolean {
        return this.authState !== null;
    }

    get currentUserId(): string {
        return this.isAuthenticated ? this.authState.uid : null;
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
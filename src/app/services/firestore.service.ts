import { Injectable } from "@angular/core";
import { AngularFirestore, QueryFn } from "@angular/fire/firestore";
import { Observable, observable } from "rxjs";
import { CommonLoaderService } from '../common-loader/common-loader.service';

@Injectable({
    providedIn: 'root'
})
export class FireStoreService {
    constructor(
        private firebase: AngularFirestore,
        private loader: CommonLoaderService
    ) {}

    getDocSnapshotChanges(docPath: string): Observable<any> {
        return Observable.create(observable => {
            this.firebase.doc(docPath).snapshotChanges().subscribe(resp => {
                observable.next(resp.payload.data());
                observable.complete();
            });
        });
    }
    /**
     * Subscribe to the changes to the doc
     * @param docPath 
     */
    getDoc(docPath: string): Observable<any> {
        return this.firebase.doc(docPath).valueChanges();
    }
    async getDocument(collection, query:firebaseQueryObj[]):Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>{
        return new Promise( async(resolve, reject) => {
            this.loader.isLoaderVisible = true;
            try{
                let collectionRef:any = this.firebase.collection(collection).ref;
                query.forEach(queryItem => {
                    collectionRef = collectionRef.where(queryItem.field, queryItem.condition, queryItem.value);
                })
                const result =  await collectionRef.get();
                resolve(result);
            }catch(e){
                reject(e);
            }
            finally{
                this.loader.isLoaderVisible = false;
            }
            
        })
    }
    
    getDocValue(docPath: string): Observable<any> {
        return this.firebase.doc(docPath).valueChanges();
    }
    setDoc(docPath, data){
        return this.firebase.doc(docPath).set(data);
    }
    addToCollection(collection, data){
        return this.firebase.collection(collection).add(data);
    }
    addToCollectionWithDoc(collection,doc,data){
        return this.firebase.collection(collection).doc(doc).set(data);
    }
    getCollection(collection){
        return this.firebase.collection(collection).get();
        
    }
    getCollectionWithOrderBy(collection:string, orderByField: string){
        return this.firebase.collection(collection, ref => ref.orderBy(orderByField)).get();
    }

    streamCollectionWithOrderBy(collection:string, orderByField: string){
        return this.firebase.collection(collection, ref => ref.orderBy(orderByField)).snapshotChanges();
    }
   

    async queryCollection(collection, query:firebaseQueryObj[]):Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>{
        return new Promise( async(resolve, reject) => {
            this.loader.isLoaderVisible = true;
            try{
                console.log('query:',query);
                let collectionRef:any = this.firebase.collection(collection).ref;
                query.forEach(queryItem => {
                    collectionRef = collectionRef.where(queryItem.field, queryItem.condition, queryItem.value);
                })
                const result =  await collectionRef.get();
                resolve(result);
            }catch(e){
                reject(e);
            }
            finally{
                this.loader.isLoaderVisible = false;
            }
            
        })
    }

    async isDocExists(docPath:string){
        const snapShot =  await this.firebase.doc(docPath).ref.get();
        return snapShot.exists
    }

    updateDoc(docPath:string,updateObj:any){
        this.firebase.doc(docPath).ref.update(updateObj);
    }

}

interface firebaseQueryObj  {
    field: string;
    condition: WhereFilterOp;
    value: string|boolean|any[]
}

type WhereFilterOp =
    | '<'
    | '<='
    | '=='
    | '>='
    | '>'
    | 'array-contains'
    | 'in'
    | 'array-contains-any';
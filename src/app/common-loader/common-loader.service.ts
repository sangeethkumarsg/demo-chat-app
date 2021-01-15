import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class CommonLoaderService {
    isLoaderVisible: Boolean = false;
    loaderMessage: String = 'Loading...';
    check: any = {};
    constructor() {
    }
    setLoaderVisible(isVisible: Boolean) {
        this.isLoaderVisible = isVisible;
    }
    setLoaderMsg(msg: string) {
        this.loaderMessage = msg;
    }

    getLoaderState(): Boolean {
        return this.isLoaderVisible;
    }
}

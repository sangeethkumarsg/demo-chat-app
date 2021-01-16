import { CHAT_MEDIA_TYPE } from '../constants/firestore.constant';

export class CommonUtilities {

    public static getExtension(filename:string){
        return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename
    }

    public static generateRandomString(){
        return Math.random().toString(36).substring(2);
    }

    private static imageFileExtensions = ['jpg','gif','bmp','png','jpeg'];
    private static videoFileExtenstions = ['avi','mp4','mpg','mkv'];
    private static audioFileExtenstions = ['mp3','wav'];

    public static getMediaType(filename:string){
        const extenstion = this.getExtension(filename);
        if(this.imageFileExtensions.indexOf(extenstion) > -1){
            return CHAT_MEDIA_TYPE.IMAGE;
        }else if(this.audioFileExtenstions.indexOf(extenstion) > -1){
            return CHAT_MEDIA_TYPE.AUDIO
        }else if(this.videoFileExtenstions.indexOf(extenstion) > -1){
            return CHAT_MEDIA_TYPE.VIDEO;
        }
        return CHAT_MEDIA_TYPE.UNKNOWN;
    }

    public static getDateTime(dateTimeString:string){
        const ts = new Date(dateTimeString);
        let day = ts.getDate() + "";
        let month = (ts.getMonth() + 1) + "";
        let year = ts.getFullYear() + "";
        let hour = ts.getHours() + "";
        let minutes = ts.getMinutes() + "";
        let seconds = ts.getSeconds() + "";

        day = this.checkZero(day);
        month = this.checkZero(month);
        year = this.checkZero(year);
        hour = this.checkZero(hour);
        minutes = this.checkZero(minutes);
        seconds = this.checkZero(seconds);
        return day +"/" + month +"/" + year + " "+ this.convertTo12HourClock(hour+":"+minutes);
    }

    private static checkZero(data){
        if(data.length == 1){
          data = "0" + data;
        }
        return data;
      }
    
    private static convertTo12HourClock(time){
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice (1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
    }

}
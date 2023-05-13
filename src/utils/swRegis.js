import { Workbox } from "workbox-window";
const swRegis = async()=>{
    if(!('serviceWorker' in navigator)){
        alert('Service Worker in Browser Not Support!');
    }
    const workB = new Workbox('sw.workbox.js');
    try{
        await workB.register();
        console.log("service worker installed");
    }
    catch(error){
        alert('Service Worker Failed Install');
    }
}
export default swRegis;
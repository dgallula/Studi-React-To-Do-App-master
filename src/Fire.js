import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBheznryneyMUt891q98hqZja4X7T4Vl8E",
    authDomain: "todoapp-131c7.firebaseapp.com",
    projectId: "todoapp-131c7",
    storageBucket: "todoapp-131c7.appspot.com",
    messagingSenderId: "549328675845",
    appId: "1:549328675845:web:2bd4947b8e06b336c7286c"
};

export default class Fire {
    constructor(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null);
            } else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error);
                });
            }
        })
    }

    get ref() {
        return firebase.firestore().collection("lists");
    }

    getLists(callback) {
        let ref = this.ref.orderBy("name");
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let lists = [];
            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() })
            });
            callback(lists);
        }, function(error) {
            callback(error);
        });
    }

    addList(list) {
        this.ref.add(list);
    }

    deleteList(list) {
        this.ref.doc(list.id).delete();
    }

    updateList(list) {
        this.ref.doc(list.id).update(list);
    }

    detach() {
        this.unsubscribe();
    }
}
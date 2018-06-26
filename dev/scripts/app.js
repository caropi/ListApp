import React from 'react';
import ReactDom from 'react-dom';
import NoteCard from './notesCard.js';
import InfoSideBar from './infosidebar.js';
const config = {
  apiKey: "AIzaSyDBodQTjhGFdjOszO9WZ9kZCAphvQhm7Ts",
  authDomain: "skincare-notes.firebaseapp.com",
  databaseURL: "https://skincare-notes.firebaseio.com",
  projectId: "skincare-notes",
  storageBucket: "skincare-notes.appspot.com",
  messagingSenderId: "670058924123"
};
firebase.initializeApp(config);
const skincareSteps = [
  {
    "description": "Considered a chemical exfoliant, this could consist of AHA(Alpha Hydroxy Acid) or BHA (Beta Hydroxy Acid). You don't have to do this every day if you have sensitive skin. Chemical exfoliants will get rid of a lot of dead skin cells without needing to resort to harsh scrubs.",
    "id": "actives",
    "img": "../../assets/actives.svg",
    "name": "Actives",
    "value": 5,
    "waitTime": "20-30 minutes"
  },
  {
    "description": "A staple of the standard 3-step routine is also essential to a routine of any size. Moistuizers come in many forms—from an emulsion, lotion, gel, or cream. They work to seal in moisture to plump up skin. Should be used in the morning and night.",
    "id": "cream",
    "img": "../../assets/cream.svg",
    "name": "Cream",
    "value": 9,
    "waitTime": "2-3 minutes"
  },
  {
    "description": "To be applied by thinnest to thickest consistency. This is where your skin gets very concentrated treatments to fight specific needs (i.e. pores, acne, hydration). Gently tap your face to apply products.",
    "id": "essenceSerumAmpoule",
    "img": "../../assets/essence-serum-ampoule.svg",
    "name": "Essence / Serum / Ampoule",
    "value": 7,
    "waitTime": "2-3 minutes"
  },
  {
    "description": "Before you pile makeup on under eyes, make sure you're actually fixing the problem underneath the makeup. Some use oils and others use creams to brighten and hydrate the skin underneath the eyes. Some have sensitive skin around the eyes and require this step more than others. ",
    "id": "eyeCream",
    "img": "../../assets/eye-cream.svg",
    "name": "Eye Cream",
    "value": 10,
    "waitTime": "1-2 minutes"
  },
  {
    "description": "Either wash off or sheet mask. These come in different varieties depending on your needs (hydrating, skin polishing, brightening, etc). Pro-tip: If you're using a sheet mask, keep the packet with leftover essence to use on the rest of your body.",
    "id": "mask",
    "img": "../../assets/mask.svg",
    "name": "Mask",
    "value": 12,
    "waitTime": "15-30 minutes (depending on mask)"
  },
  {
    "description": "The backbone of many natural skincare routines. It seems counter intuitive to put oil on oily skin but don't underestimate their efficacy. Some oils compositions ape and imitate the skins natural oils which can halt overproduction of oil on your skin due to dryness. Many other oils have properties that can aid in scar healing and dark spots.",
    "id": "oil",
    "img": "../../assets/oil.svg",
    "name": "Oil",
    "value": 8,
    "waitTime": "5 minutes (or until dry)"
  },
  {
    "description": "Essential if you spend your day wearing makeup or heavy sun block that just doesn't come off. Yes, the sun block has to come off too at the end of the day! A good way to check if your cleanser is actually removing sun block is to put some sun block on the back of your hand and drop some water on it, if it pearls it means the sun block is still knocking about. Oil cleansing is perfect for all skin types and should minimize any dryness or irritation.",
    "id": "oilCleanser",
    "img": "../../assets/oil-cleanser.svg",
    "name": "Oil Cleanser",
    "value": 1,
    "waitTime": "None, go nuts!"
  },
  {
    "description": "Certain products that reduce scarring, cystic acne, skin discolourations need to be prescribed by a doctor in order to ensure that you're using potent enough products on your skin. Some examples of this include retinoids/tretinoin, azelaic acid, and clindamycin. Depending on where you live, these items may be available without prescription. Make sure to ask your doctor what the recommended application is as overapplication can result in skin irritation.",
    "id": "prescriptions",
    "img": "../../assets/prescriptions.svg",
    "name": "Prescriptions",
    "value": 6,
    "waitTime": "5-20 minutes (longer if you need to let the prescription do its work)"
  },
  {
    "description": "Can be used as only cleanse if you don't need to remove much. This step clears any extra makeup/sun block residue or oil cleanser. If your skin is extra sensitive or you're using actives remember, the lower the pH of your cleanser, the better!",
    "id": "secondCleanser",
    "img": "../../assets/foaming-cleanser.svg",
    "name": "Second Cleanser",
    "value": 2,
    "waitTime": "0 if you have a pH balanced cleanser or toner. Otherwise just wait 5-6 minutes"
  },
  {
    "description": "This is an optional step that is better suited to colder climates where the skin can get drier. Sleeping packs seal in all of your prior steps and is left on overnight. In the morning make sure to wash it off as they're not meant to be work during the day.",
    "id": "sleepingPack",
    "img": "../../assets/sleeping-pack.svg",
    "name": "Sleeping Pack",
    "value": 11,
    "waitTime": "Leave that puppy on overnight! She's working."
  },
  {
    "description": "No matter where what the season or weather, the sun is a tenacious death ray and you need to protect yourself from it. This is even more vital if you're using prescriptions or active ingredients in your skincare routine which will make your skin photo sensitive. It doesn't matter if your moisturizer or makeup says it has spf-15, it's useless. You need a dedicated sun block to actually protect your skin. If you want your makeup or moisturizer to work as a sun block be prepared to throw buckets of it on your face.",
    "id": "sunBlock",
    "img": "../../assets/sun-block.svg",
    "name": "Sun Block",
    "value": 13,
    "waitTime": "None! Go outside and live your life"
  },
  {
    "description": "Toners really function well at balancing the skin's pH so it's ready for active ingredients. They vary from super hydrating to slightly tingly. One major takeaway: if it's burning you, you have every right to burn it in a ceremonial fire and never speak of it again.",
    "id": "toner",
    "img": "../../assets/toner.svg",
    "name": "Toner",
    "value": 3,
    "waitTime": "Depends on Consistency and how long it takes to dry"
  }
];

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      notes: [],
      loggedin: false
    }
    this.showSidebar = this.showSidebar.bind(this);
    this.showSkincareInfo = this.showSkincareInfo.bind(this);
    this.addNote = this.addNote.bind(this);
    this.showCreate = this.showCreate.bind(this);
    this.createUser = this.createUser.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        firebase.database().ref(`users/${user.uid}/notes`).on('value', (res) => {
          const userData = res.val();
          const dataArray = [];
          for(let objKey in userData) {
            userData[objKey].key = objKey;
            dataArray.push(userData[objKey])
          }
          this.setState({
            notes: dataArray,
            loggedin: true
          })
        });
      }
      else {
        this.setState({
          notes: [],
          loggedin: false
        })
      }
    })
  }

  showSidebar(e) {
    e.preventDefault();
    this.sidebar.classList.toggle('show');
  }

  showSkincareInfo(e) {
    e.preventDefault();
    this.skincareSideBarInfo.classList.toggle('show');
  }

  addNote(e) {
    e.preventDefault();
    const note = {
      title: this.noteTitle.value,
      text: this.noteText.value,
      repurchase: this.repurchase.value
    }  
    const userId = firebase.auth().currentUser.uid
    const dbRef = firebase.database().ref(`users/${userId}/notes`);

    dbRef.push(note);

    this.noteTitle.value = ""; //clear out values
    this.noteText.value = ""; //clears out values
    this.repurchase.value = "";
    this.showSidebar(e); //calls the toggle sidebar function after all of the other events in this function run
  }

  removeNote(noteId) {
    const userId = firebase.auth().currentUser.uid;
    const dbRef = firebase.database().ref(`users/${userId}/notes/${noteId}`);
    dbRef.remove();
  }

  showCreate(e) {
    e.preventDefault();
    this.overlay.classList.toggle('show');
    this.createUserModal.classList.toggle('show');
  }

  createUser(e) {
    e.preventDefault();

    const email = this.createEmail.value;
    const password = this.createPassword.value;
    const confirm = this.confirmPassword.value;

    if(password === confirm) {
      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          this.showCreate(e);
        })
        .catch((err) => {
          alert(err.message)
        })
    }
    else {
      alert('Passwords must match')
    }
  }

  showLogin(e) {
    e.preventDefault();
    this.overlay.classList.toggle('show');
    this.loginModal.classList.toggle('show');
  }

  loginUser(e) {
    e.preventDefault();
    const email = this.userEmail.value;
    const password = this.userPassword.value;

    firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      this.showLogin(e);
    })
    .catch((err) => {
      alert(err.message);
    });
  }

  logOut() {
    firebase.auth().signOut();
  }

  renderCards() {
    if(this.state.loggedin) {
      return this.state.notes.map((note, i) => {
        return (
          <NoteCard note={note} key={`note=${i}`} removeNote={this.removeNote} />
        )
      }).reverse()
    }
    else {
      return (
        <div className="greeting">
          <h2>
            Welcome!
          </h2>
          <p>
            Got problem skin? It can be hard to keep track of products you've tried, what worked, what didn't, not to mention super long product names. Sign up today to track your progress! 
          </p>
        </div>
      );
    }
  }


  render() {
    return (
      <div>
        <header className="mainHeader">
        <div className="mainHeader__title">
          <img src="../../assets/duckie.svg" alt=""/>
          <h1>Take Care</h1>
          <h2>Your Skincare Log</h2>
        </div>
          <nav>
            {
              (() => {
                if(this.state.loggedin) {
                  return(
                    <span>
                      <a onClick={this.showSidebar}>Add New Item</a>
                      <a onClick={this.logOut}>Logout</a>
                    </span>
                  )
                }
                else {
                  return (
                    <span>
                      <a href="" onClick={this.showCreate}>Create Account</a>
                      <a href="" onClick={this.showLogin} >Login</a>
                    </span>
                  )
                }
              })()
            }
            {/* <i className="fas fa-stopwatch"></i> */}
            <i className="fas fa-info-circle" onClick={this.showSkincareInfo}></i> 
          </nav>
        </header>
        <div className="overlay" ref={ref => this.overlay = ref} ></div>
        <section className="notes">
          {this.renderCards()}
          {/* ^^^ .reverse makes notes appear in reverse order so the newer notes appear first */}
        </section>
        <aside className="sidebar" ref={ref => this.sidebar = ref}>
          <form onSubmit={this.addNote}>
            <h3>Add New Note</h3>
            <div className="close-btn" onClick={this.showSidebar}>
              <i className="fas fa-times"></i>
            </div>
            <label htmlFor="note-title">Product Name:</label>
            <input type="text" name="note-title" ref={ref => this.noteTitle = ref}/>
            <label htmlFor="note-text">Product Description:</label>
            <textarea name="note-text" rows="5" ref={ref => this.noteText = ref} placeholder="How did your skin react to this product? What are some highlights/noteworthy ingredients?"></textarea>
            <label htmlFor="repurchase">Repurchase?</label>
            <input type="text" name="repurchase" ref={ref => this.repurchase = ref} placeholder="Yes/No/Maybe"/>
            <label htmlFor="price">Price:</label>
            <input type="text" name="price" ref={ref => this.price = ref} placeholder="$24"/>
            <input type="submit" value="Add New Note"/>
          </form>
        </aside>
        <aside className="modal" ref={ref => this.skincareSideBarInfo = ref} >
          <div className="close-btn" onClick={this.skincareSideBar}>
            <i className="fas fa-times"></i>
          </div>
          <InfoSideBar skincareSteps={skincareSteps} />
        </aside>
        <div className="loginModal modal" ref={ref => this.loginModal = ref}>
          <div className="close-btn" onClick={this.showLogin}>
            <i className="fas fa-times"></i>
          </div>
          <form action="" onSubmit={this.loginUser} >
            <div>
              <label htmlFor="email">Email</label>
              <input type="text" name="email" ref={ref => this.userEmail = ref} placeholder="Your Email"/>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" ref={ref => this.userPassword = ref} placeholder="Password"/>
              </div>
              <div>
                <input type="submit" value="Login"/>
              </div>
          </form>
        </div>

        <div className="createUserModal modal" ref={ref => this.createUserModal = ref} >
          <div className="close" onClick={this.showCreate}>
            <i className="fas fa-times"></i>
          </div>
          <form action="" onSubmit={this.createUser} >
            <div>
              <label htmlFor="createEmail">Email</label>
              <input type="text" name="createEmail" ref={ref => this.createEmail = ref} placeholder="Your Email" />
            </div>
            <div>
              <label htmlFor="createPassword">Password</label>
              <input type="password" name="createPassword" ref={ref => this.createPassword = ref} placeholder="Password" />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" name="confirmPassword" ref={ref => this.confirmPassword = ref} placeholder="Repeat Password" />
            </div>
            <div>
              <input type="submit" value="Create Account" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

ReactDom.render(<App/>, document.getElementById('app'))
import React from 'react';
import ReactDom from 'react-dom';
import NoteCard from './notesCard.js';
import InfoSideBar from './infosidebar.js';
import skincareSteps from './SkincareSteps.js';
import Timer from './timer.js';
const config = {
  apiKey: "AIzaSyDBodQTjhGFdjOszO9WZ9kZCAphvQhm7Ts",
  authDomain: "skincare-notes.firebaseapp.com",
  databaseURL: "https://skincare-notes.firebaseio.com",
  projectId: "skincare-notes",
  storageBucket: "skincare-notes.appspot.com",
  messagingSenderId: "670058924123"
};
firebase.initializeApp(config);


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
    this.showTimer = this.showTimer.bind(this);
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
    this.overlay.classList.toggle('show');
    this.skincareModal.classList.toggle('show');
  }

  addNote(e) {
    e.preventDefault();
    const note = {
      title: this.noteTitle.value,
      text: this.noteText.value,
      repurchase: this.repurchase.value,
      price: this.price.value

    }  
    const userId = firebase.auth().currentUser.uid
    const dbRef = firebase.database().ref(`users/${userId}/notes`);

    dbRef.push(note);

    this.noteTitle.value = ""; //clear out values
    this.noteText.value = ""; //clears out values
    this.repurchase.value = "";
    this.price.value = "";
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

  showTimer(e) {
    e.preventDefault();
    this.overlay.classList.toggle('show');
    this.timerContainer.classList.toggle('show');
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
            <i className="fas fa-info-circle" onClick={this.showSkincareInfo}></i> 
            <i className="fas fa-stopwatch" onClick={this.showTimer}></i>
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
          <div className="copyright">
          <p>
            &copy; <a href="http://www.carolinepisano.com">Caroline Pisano</a>, 2018.
          </p>
          </div>
        </aside>

        <aside className="modal skincareModal" ref={ref => this.skincareModal = ref} >
          <div className="close-btn" onClick={this.showSkincareInfo}>
            <i className="fas fa-times"></i>
          </div>
          <h3>Skincare Breakdown</h3>
          <p>Below is an ordered breakdown of items you may have in your routine. For some, a full twelve steps is necessary, for others, a simple three step routine suffices. Just remember folks, your mileage may vary, and <a href="https://www.reddit.com/r/SkincareAddiction/">Reddit</a> is your friend.</p>
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

        <div className="timerContainer modal" ref={ref => this.timerContainer = ref}>
          <div className="close-btn" onClick={this.showTimer}>            
            <i className="fas fa-times"></i>
          </div>
          <Timer />
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
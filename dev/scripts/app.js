import React from 'react';
import ReactDom from 'react-dom';
import NoteCard from './notesCard.js';
import InfoSidebar from './infosidebar.js';
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
        <h2>Login to add notes!</h2>
      );
    }
  }

  render() {
    return (
      <div>
        <header className="mainHeader">
          <h1>My.Beauty.Log</h1>
          <nav>
            {
              (() => {
                if(this.state.loggedin) {
                  return(
                    <span>
                      <a onClick={this.showSidebar}>Add New Note</a>
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
            <i class="fa fa-stopwatch"></i>
            <i className="fa fa-info-circle"></i>
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
              <i className="fa fa-times"></i>
            </div>
            <label htmlFor="note-title">Product Name:</label>
            <input type="text" name="note-title" ref={ref => this.noteTitle = ref}/>
            <label htmlFor="note-text">Product Description:</label>
            <textarea name="note-text" ref={ref => this.noteText = ref}></textarea>
            <label htmlFor="repurchase">Repurchase?</label>
            <input type="text" name="repurchase" ref={ref => this.repurchase = ref}/>
            <input type="submit" value="Add New Note"/>
          </form>
        </aside>
        <aside>

        </aside>
        <div className="loginModal modal" ref={ref => this.loginModal = ref}>
          <div className="close" onClick={this.showLogin}>
            <i className="fa fa-times"></i>
          </div>
          <form action="" onSubmit={this.loginUser} >
            <div>
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" ref={ref => this.userEmail = ref}/>
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" ref={ref => this.userPassword = ref}/>
              </div>
              <div>
                <input type="submit" value="Login"/>
              </div>
          </form>
        </div>

        <div className="createUserModal modal" ref={ref => this.createUserModal = ref} >
          <div className="close" onClick={this.showCreate}>
            <i className="fa fa-times"></i>
          </div>
          <form action="" onSubmit={this.createUser} >
            <div>
              <label htmlFor="createEmail">Email:</label>
              <input type="text" name="createEmail" ref={ref => this.createEmail = ref} />
            </div>
            <div>
              <label htmlFor="createPassword">Password:</label>
              <input type="password" name="createPassword" ref={ref => this.createPassword = ref} />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" name="confirmPassword" ref={ref => this.confirmPassword = ref} />
            </div>
            <div>
              <input type="submit" value="Create" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

ReactDom.render(<App/>, document.getElementById('app'))
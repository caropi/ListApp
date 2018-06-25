import React from 'react';


export default class NoteCard extends React.Component {
    constructor() {
        super();
        this.state = {
            editing: false,
            note: {}
        };
        this.save = this.save.bind(this);
    }
    save(e) {
        e.preventDefault();
        const userId = firebase.auth().currentUser.uid;
        const dbRef = firebase.database().ref(`users/${userId}/notes/${this.props.note.key}`); //where we want it to look to save

        dbRef.update({
            title: this.noteTitle.value,
            text: this.noteText.value,
            repurchase: this.repurchase.value
        });

        this.setState({
            editing: false
        });
    }

    render () {
        let editingTemp = (
            <span>
                <h4>{this.props.note.title}</h4>
                <p>{this.props.note.text}</p>
                <p><strong>Repurchase?</strong> {this.props.note.repurchase}</p>
            </span>
        )
        if(this.state.editing) {
            editingTemp = (
                <form onSubmit={this.save}>
                    <div>
                        <input type="text" defaultValue={this.props.note.title} name='title' ref={ref => this.noteTitle = ref}/>
                    </div>
                    <div>
                        <input type="text" defaultValue={this.props.note.text} name='text' ref={ref => this.noteText = ref} />
                    </div>
                    <div>
                        <input type="text" defaultValue={this.props.note.repurchase} ref={ref => this.repurchase = ref}/>
                    </div>
                    <input type="submit" value='Done editing!'/>
                </form>
            )
        }
        return (
            <div className="noteCard">
                <i className="fa fa-edit" onClick={() => this.setState({editing: true})}></i>
                <i className="fa fa-times" onClick={() => this.props.removeNote(this.props.note.key)}></i>
                {editingTemp}
            </div>
        )
    }
}
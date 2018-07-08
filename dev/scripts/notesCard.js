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
            repurchase: this.repurchase.value,
            price: this.price.value
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
                <h5>Repurchase: {this.props.note.repurchase}</h5>
                <h6>Cost: {this.props.note.price}</h6>
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
                    <div>
                        <input type="text" defaultValue={this.props.note.price} ref={ref => this.price = ref}/>
                    </div>
                    <input type="submit" value='Done editing!'/>
                </form>
            )
        }
        return (
            <div className="noteCard">
                <i className="fas fa-edit" onClick={() => this.setState({editing: true})}></i>
                <i className="fas fa-times" onClick={() => this.props.removeNote(this.props.note.key)}></i>
                {editingTemp}
            </div>
        )
    }
}
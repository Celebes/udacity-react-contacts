import React, {Component} from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
    state = {
        screen: 'list', // list, create
        contacts: []
    };

    componentDidMount() {
        ContactsAPI.getAll().then((contactsFromAPI) => {
            this.setState({
                contacts: contactsFromAPI
            })
        })
    }

    /*
        fat arrow notation assures us that 'this' will point to App component
        even when called from within ListContacts component (or any other)
     */
    removeContact = (contact) => {
        this.setState((prevState) => ({
            contacts: prevState.contacts.filter((c) => c.id !== contact.id)
        }))

        ContactsAPI.remove(contact);
    }

    render() {
        return (
            <div className="app">
                {this.state.screen === 'list' && (
                    <ListContacts onDeleteContact={this.removeContact}
                                  onNavigate={() => {this.setState({screen: 'create'})}}
                                  contacts={this.state.contacts}/>
                )}
                {this.state.screen === 'create' && (
                    <CreateContact/>
                )}
            </div>
        )
    }
}

export default App;

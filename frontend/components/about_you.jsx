const React = require('react');
const UserStore = require('../stores/user_store.js');
const UserActions = require('../actions/user_actions.js');
const SavedProjectStore = require('../stores/saved_project_store');
const SessionStore = require('../stores/session_store.js');

const AboutYou = React.createClass({

  getInitialState () {
    return({
      author_id: "",
      pic_url: "",
      full_name: "",
      biography: "",
      location: "",
      website: "",
      saved: 'saved',
      errorMessage: ""
    });
  },

  componentDidMount () {
    this._prepopulate();
  },

  componentWillUnmount () {

  },

  _resetSavedStatus () {
    this.setState({saved: 'unsaved', errorMessage: ""});
  },

  _prepopulate () {
    let _currentUser = SessionStore.currentUser();
    let _initialLocation = SavedProjectStore.currentProject().location;
    this.setState({full_name: _currentUser.username, location: _initialLocation});
  },

  _setName (event) {
    event.preventDefault();
    this.setState({full_name: event.target.value});
    this._resetSavedStatus();
  },

  _setBiography (event) {
    event.preventDefault();
    this.setState({biography: event.target.value});
    this._resetSavedStatus();
  },

  _setLocation (event) {
    event.preventDefault();
    this.setState({location: event.target.value});
    this._resetSavedStatus();
  },

  _setWebsite (event) {
    event.preventDefault();
    this.setState({website: event.target.value});
    this._resetSavedStatus();
  },

  _handleSave () {
    if (this.state.saved === 'saved') {
      this.setState({errorMessage: "Your information is already up-to-date"});
    } else {
      this.setState({errorMessage: "", saved: 'saved'});
      this._saveUserInfo();
    }
  },

  _saveUserInfo () {
    console.log('success!');
  },

  render: function() {
    return (
      <div className="about-you-wrapper">
        <div className="about-you-form">
          <ul>
            <li className="user-image-field">
              <div className="grey-field">
                <div className="attribute-field">Profile photo</div>
                <div className="field-wrapper">
                  <button>Choose an image from your computer</button>
                </div>
              </div>
            </li>
            <li className="user-name-field">
              <div className="grey-field">
                <div className="attribute-field">Full Name</div>
                <div className="warning-text"><strong>Warning:</strong> Once
                  you launch your project, you cannot modify your full
                  name.</div>
                <div className="field-wrapper">
                  <input type="text" className="user-name"
                    onChange={this._setName} value={this.state.full_name || ""}/>
                </div>
              </div>
            </li>
            <li className="user-biography-field">
              <div className="grey-field">
                <div className="attribute-field">Biography</div>
                <div className="field-wrapper">
                  <textarea rows="4" value={this.state.biography || ""}
                    wrap="hard" className="user-biography"
                    onChange={this._setBiography} />
                </div>
              </div>
            </li>
            <li className="user-location-field">
              <div className="grey-field">
                <div className="attribute-field">Location</div>
                <div className="field-wrapper">
                  <input type="text" className="user-location"
                    onChange={this._setLocation} value={this.state.location || ""}/>
                </div>
              </div>
            </li>
            <li className="user-website-field">
              <div className="grey-field">
                <div className="attribute-field">Website</div>
                <div className="field-wrapper">
                  <input type="text" className="website"
                    onChange={this._setWebsite}
                    value={this.state.website || ""}/>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div id="save-box" className={this.state.saved || 'saved'}>
          <button className={this.state.saved || 'saved'}
            onClick={this._handleSave}>Save Changes</button>
          <p>{this.state.errorMessage}</p>
        </div>
      </div>
    );
  }

});

module.exports = AboutYou;

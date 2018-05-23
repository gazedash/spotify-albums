import React from "react";
import _ from "lodash";

const sortTypes = ["new", "old", "popular"];
const includeTypes = {
  live: false,
  compilations: false,
  appearsOn: false
};

export class Form extends React.Component {
  state = {
    form: {
      includes: includeTypes,
      playlistName: "",
      artist: ""
    }
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.form);
  };

  handleChange = field => ({ currentTarget }) => {
    if (field === "artist") {
      if (
        !this.state.form.playlistName ||
        this.state.form.playlistName === this.state.form.artist
      ) {
        this.setState(oldState => ({
          form: {
            ...oldState.form,
            playlistName: currentTarget.value
          }
        }));
      }
      if (currentTarget.value === "") {
        this.setState(oldState => ({
          form: {
            ...oldState.form,
            playlistName: ""
          }
        }));
      }
    }

    this.setState(oldState => ({
      form: {
        ...oldState.form,
        [field]: currentTarget.value
      }
    }));
  };

  handleIncludeCheck = key => ({ currentTarget }) => {
    this.setState(oldState => ({
      form: {
        ...oldState.form,
        includes: {
          ...oldState.form.includes,
          [key]: currentTarget.checked
        }
      }
    }));
  };

  render() {
    const { includes } = this.state.form;
    return (
      <div>
        <div>Spotify</div>

        <input placeholder="Artist" onChange={this.handleChange("artist")} />

        <div>Sort</div>

        {sortTypes.map(type => (
          <div key={type}>
            <input
              name="sort"
              type="radio"
              value={type}
              onChange={this.handleChange("sort")}
            />
            <label>{type}</label>
          </div>
        ))}

        <div>Include</div>

        {Object.keys(includes).map(type => (
          <div key={type}>
            <input
              type="checkbox"
              value={includes[type]}
              onChange={this.handleIncludeCheck(type)}
            />
            <label>{type}</label>
          </div>
        ))}

        <input
          placeholder={
            this.state.form.artist
              ? this.state.form.artist + " Albums"
              : "Playlist name"
          }
          onChange={this.handleChange("playlistName")}
        />

        <button onClick={this.handleSubmit}>Save</button>
      </div>
    );
  }
}

export default Form;

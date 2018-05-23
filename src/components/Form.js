import React from "react";
import _ from "lodash";

const sortTypes = ["new", "old", "popular"];
const includeTitles = {
  // live: "live",
  compilation: "compilations",
  appears_on: "appears on"
};
const includeTypes = {
  // live: false,
  compilation: false,
  appears_on: false
};

export class Form extends React.Component {
  state = {
    form: {
      includes: includeTypes,
      playlistName: "",
      artist: "",
      sort: "new"
    }
  };

  handleSubmit = () => {
    const { form } = this.state;
    this.props.onSubmit({
      ...form,
      playlistName: form.playlistName
        ? form.playlistName
        : form.artist + " Albums"
    });
  };

  handleChange = field => ({ currentTarget }) => {
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
    const { includes, sort, artist } = this.state.form;
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
              checked={type === sort}
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
            <label>{includeTitles[type]}</label>
          </div>
        ))}

        <input
          placeholder={artist ? artist + " Albums" : "Playlist name"}
          onChange={this.handleChange("playlistName")}
        />

        <button onClick={this.handleSubmit}>Save</button>
      </div>
    );
  }
}

export default Form;

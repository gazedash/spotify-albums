import React from "react";
import { Button, Box, Text, Input, Label } from "./Styled";
// import _ from "lodash";

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
      <Box>
        <Text>Spotify</Text>

        <Input placeholder="Artist" onChange={this.handleChange("artist")} />

        <Text>Sort</Text>

        {sortTypes.map(type => (
          <Box key={type}>
            <Input
              name="sort"
              type="radio"
              value={type}
              checked={type === sort}
              onChange={this.handleChange("sort")}
            />
            <Label>{type}</Label>
          </Box>
        ))}

        <Box>Include</Box>

        {Object.keys(includes).map(type => (
          <Box key={type}>
            <Input
              type="checkbox"
              value={includes[type]}
              onChange={this.handleIncludeCheck(type)}
            />
            <Label>{includeTitles[type]}</Label>
          </Box>
        ))}

        <Input
          placeholder={artist ? artist + " Albums" : "Playlist name"}
          onChange={this.handleChange("playlistName")}
        />

        <Button onClick={this.handleSubmit}>Save</Button>
      </Box>
    );
  }
}

export default Form;

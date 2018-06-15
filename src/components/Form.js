import React from "react";
import { Button, Box, Text, Input, Label, TabRadio } from "./Styled";
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
    <Text fontSize={16} color={"#1db954"}>Spotify</Text>

        <Input placeholder="Artist" onChange={this.handleChange("artist")} />

        <Text>Sort</Text>

        {sortTypes.map(type => (
          <Box key={type}>
            <TabRadio
              id={type}
              name="sort"
              value={type}
              label={type}
              checked={type === sort}
              onChange={this.handleChange("sort")}
            />
          </Box>
        ))}

        <Text></Text>

        <Input
          placeholder={artist ? artist + " Albums" : "Playlist name"}
          onChange={this.handleChange("playlistName")}
        />
        <Text></Text>
        <Box>
        <Button onClick={this.handleSubmit}>Save</Button>
          </Box>
      </Box>
    );
  }
}

export default Form;

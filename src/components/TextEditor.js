import React from "react";
import { Editor } from "slate-react";
import { Value } from "slate";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import ListIcon from "@material-ui/icons/List";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  editorPaper: {
    margin: 20,
    paddingTop: 5,
    height: "60vh"
  },
  editor: {
    margin: 20
  },
  iconsPaper: {
    margin: 20
  },
  icon: {
    marginTop: 5,
    marginLeft: 15
  }
});

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [{ text: "Hello Slate.js!!!" }]
          }
        ]
      }
    ]
  }
});

class TextEditor extends React.Component {
  state = {
    value: initialValue
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  onKeyDown = (e, editor, next) => {
    // Winだとe.ctrlKeyを使う
    if (!e.ctrlKey) {
      return next();
    }

    e.preventDefault();

    switch (e.key) {
      case "b": {
        editor.toggleMark("bold");
        return;
      }
      case "i": {
        editor.toggleMark("italic");
        return;
      }
      case "u": {
        editor.toggleMark("underlined");
        return;
      }
      case "l": {
        editor.toggleMark("list");
        return;
      }
      default: {
        return;
      }
    }
  };

  renderMark = (props, next) => {
    switch (props.mark.type) {
      case "bold": {
        return <strong {...props.attributes}>{props.children}</strong>;
      }
      case "italic": {
        return (
          <em {...props.attributes} property="italic">
            {props.children}
          </em>
        );
      }
      case "underlined": {
        return <u {...props.attributes}>{props.children}</u>;
      }
      case "list": {
        return (
          <ul {...props.attributes}>
            <li>{props.children}</li>
          </ul>
        );
      }
      default: {
        return;
      }
    }
  };

  onIconClick = (e, name) => {
    e.preventDefault();
    this.editor.toggleMark(name);
  };

  ref = editor => {
    this.editor = editor;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.iconsPaper} elevation={6}>
          <FormatBoldIcon
            className={classes.icon}
            onClick={e => this.onIconClick(e, "bold")}
          />
          <FormatItalicIcon
            className={classes.icon}
            onClick={e => this.onIconClick(e, "italic")}
          />
          <FormatUnderlinedIcon
            className={classes.icon}
            onClick={e => this.onIconClick(e, "underlined")}
          />
          <ListIcon
            className={classes.icon}
            onClick={e => this.onIconClick(e, "list")}
          />
        </Paper>
        <Paper className={classes.editorPaper} elevation={6}>
          <Editor
            className={classes.editor}
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderMark={this.renderMark}
            ref={this.ref}
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(TextEditor);

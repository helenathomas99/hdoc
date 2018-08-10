import React, {Component, Button} from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import createStyles from 'draft-js-custom-styles';
import io from 'socket.io-client';
import FontPicker from 'font-picker-react';


import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';


/* Define custom styles */
const customStyleMap = {
  selection0: {
    borderLeft: 'solid 3px red',
    backgroundColor: 'rgba(255,0,0,.5)',
  },
  selection1: {
    borderLeft: 'solid 3px blue',
    backgroundColor: 'rgba(0,255,0,.5)',
  },
  selection2: {
    borderLeft: 'solid 20px green',
    backgroundColor: 'rgba(40,50,255,.5)',
    fontSize: '80px',
  },
};

/* Have draft-js-custom-styles build help functions for toggling font-size, color */
const {
  styles,
  customStyleFn,
} = createStyles(['font-size', 'color'], customStyleMap);

/* Let draft-js know what styles should be block vs inline
 * NOTE: This is needed, but RichUtils.toggleBlockType,
 *       RichUtils.toggleInlineStyle need to get called
 */
function isBlockStyle(style) {
  if (style.indexOf('text-align-') === 0) return true;
  return false;
}

function getBlockStyle(block) {
  const type = block.getType();
  return isBlockStyle(type) ? type : null;
}

/* list of button we need to render */

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      activeFont: 'Open Sans'
    };
    this.onChange = (editorState) => { this.setState({editorState})};
  }

  _onBoldClick(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  _onUClick(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }
  _onIClick(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }
  _onCenterClick(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'text-align-center'));
  }

  _onRightClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'text-align-right'));
  }

  _onLeftClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'text-align-left'));
  }

  _onBulletListClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'));
  }

  _onNumberedListClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'ordered-list-item'));
  }


  render() {
    return (
      <div style={{backgroundColor: "#eee", display: "flex", flexDirection: "column", alignItems: "center"}}>
       <div>
         <button className="btn" onMouseDown={(e) => this._onBoldClick(e)}>Bold</button>
         <button className="btn" onMouseDown={(e) => this._onIClick(e)}>Italics</button>
         <button className="btn" onMouseDown={(e) => this._onUClick(e)}>Underline</button>
         <button className="btn" onMouseDown={(e) => this._onLeftClick(e)}>Left</button>
         <button className="btn" onMouseDown={(e) => this._onCenterClick(e)}>Center</button>
         <button className="btn" onMouseDown={(e) => this._onRightClick(e)}>Right</button>
         <button className="btn" onMouseDown={(e) => this._onBulletListClick(e)}>Bullet List</button>
         <button className="btn" onMouseDown={(e) => this._onNumberedListClick(e)}>Numbered List</button>
         <FontPicker
           apiKey="AIzaSyAEJbLvfLVpSM2CB66g_K4iOLjospEG_rY"
           activeFont={this.state.activeFont}
           onChange={nextFont => this.setState({ activeFont: nextFont.family })}
         />
       </div>
      <Paper style={{height: 842, width: 1000, margin: 40}} zDepth={2}>
        <div className="apply-font" style={{fontSize: 50}}>
          <Editor
            className="apply-font"
            editorState={this.state.editorState}
            customStyleMap={customStyleMap}
            customStyleFn={customStyleFn}
            blockStyleFn={getBlockStyle}
            onChange={this.onChange}
            />
          </div>
       </Paper>
     </div>
    );
  }
}

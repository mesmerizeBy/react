import React from 'react';
import { Tag, Input, Tooltip, Icon } from 'antd';
import {connect } from 'react-redux';
import {addTag,removeTag} from './action/maina.js';

class EditableTagGroup extends React.Component {
  state = {
    inputVisible: false,
    inputValue: '',
  };

  handleClose = (removedTag) => {
    this.props.onRemove(removedTag);
    // console.log(tags);
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = this.props.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      this.props.onAdd(inputValue);
    }

    // console.log(this.props);
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef = input => this.input = input

  render() {
    const {  inputVisible, inputValue } = this.state;
    const {tags} =this.props;
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} value={tag} closable={true} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> 添加标签
          </Tag>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      tags:state.articleState.tags,
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        onAdd:(tag)=>dispatch(addTag(tag)),
        onRemove:(tag)=>dispatch(removeTag(tag))
    }
}

EditableTagGroup=connect(mapStateToProps, mapDispatchToProps)(EditableTagGroup);

export default EditableTagGroup;
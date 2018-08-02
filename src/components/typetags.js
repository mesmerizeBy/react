import React from 'react';
import { Tag, Input, Tooltip, Icon } from 'antd';
import {connect } from 'react-redux';
import {addType,removeType} from './action/maina.js';

class TypeTag extends React.Component {
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
    console.log(this.props,inputValue)
    let types = this.props.types;
    if (inputValue && types.indexOf(inputValue) === -1) {
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
    const {types} =this.props;
    return (
      <div>
        {types.map((tag, index) => {
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
            <Icon type="plus" /> 添加新分类
          </Tag>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      types:state.articleState.types,
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        onAdd:(types)=>dispatch(addType(types)),
        onRemove:(types)=>dispatch(removeType(types))
    }
}

TypeTag=connect(mapStateToProps, mapDispatchToProps)(TypeTag);

export default TypeTag;
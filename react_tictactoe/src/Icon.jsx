import React, { Component } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { GiCircleClaws, GiCrossMark } from 'react-icons/gi';

class Icon extends Component {
  render() {
    const { name } = this.props;

    switch (name) {
      case 'circle':
        return <GiCircleClaws className="icons" />;
      case 'cross':
        return <GiCrossMark className="icons" />;
      default:
        return <FaPencilAlt className="icons" />;
    }
  }
}

export default Icon;

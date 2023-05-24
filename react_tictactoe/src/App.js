import React, { Component } from 'react'
import {AiFillCloseCircle,AiFillInfoCircle} from 'react-icons/ai'
import {IoReloadCircle} from 'react-icons/io5'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Icon from './Icon'
import './App.css'

const itemArray = new Array(9).fill("empty")

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {winner: false,count: 0,isCross: false}
  }

  checkIsWinner (){
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
    ) {
      this.setState({winner:`${itemArray[0]}`});
    } else if (
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      this.setState({winner: `${itemArray[3]}`});
    } else if (
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      this.setState({winner:`${itemArray[6]}`});
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      this.setState({winner:`${itemArray[0]}`});
    } else if (
      itemArray[1] !== "empty" &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      this.setState({winner:`${itemArray[1]}`});
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      this.setState({winner:`${itemArray[2]}`});
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      this.setState({winner:`${itemArray[0]}`});
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      this.setState({winner:`${itemArray[2]}`});
    }
  }

  handleClick(itemNumber){
      if(this.state.winner){
        return toast(this.state.winner + " won",{type: 'success'})
      }

      if(itemArray[itemNumber] === "empty"){
        itemArray[itemNumber] = this.state.isCross ? "cross" : "circle";
        this.setState({isCross: !this.state.isCross});
        this.setState({count: this.state.count + 1})
      }else{
        return toast.error("Already filled.")
      }

      this.checkIsWinner();
  }

  reloadGame = () => {
    let items = document.getElementsByClassName("tictactoe__board__items")
    for (let index = 0; index < items.length; index++) {
      items[index].classList.remove("upDownBoxShadow")
    }
    this.setState({isCross: false});
    itemArray.fill("empty",0,9)
    this.setState({winner: false});
    this.setState({count: 0});
  }

  switchColor = (name) => {
    switch(name){
      case "circle": 
        return "#673ab7";
      case "cross":
        return "#e91e63";
      default:
        return "#007aff";
    }
  }

  afterWin(){
    let items = document.getElementsByClassName("tictactoe__board__items")
    for (let index = 0; index < items.length; index++) {
      items[index].classList.add("upDownBoxShadow")
    }
  }

  render() {
    return (
      <>
      <ToastContainer />
      <div className="tictactoe__wrapper">
      <div className="closeGame reloadGame" onClick={this.reloadGame}><IoReloadCircle /></div>
      <div className="closeGame reloadGame gameInfo" onClick={this.reloadGame}><AiFillInfoCircle /></div>
      <div className="tictactoe__board">
        {
          itemArray.map((item,index)=>(
            <div className="tictactoe__board__items" key={index} onClick={e=>this.handleClick(index)}>
              <i className="tictactoe__board__icon" style={{
                color: this.switchColor(item)
              }}>
                <Icon name={item}/>
              </i>
            </div>
          ))
        }
      </div>
      <div className="movesAndWinner">
        {
            this.state.winner ? (
              <h2 className="winnerName">The winner is {this.state.winner}</h2>
            ) : this.state.count === 9 ? (<h2 className="winnerName">You guys are worst!</h2>)
              : (
                this.state.isCross ? (<h2 className="winnerName">Cross's turn</h2>) : (<h2 className="winnerName">Circles turn</h2>)
            )
        }
      </div>
      {
        this.state.winner && this.afterWin()
      }
  </div>
  </>
    )
  }
}
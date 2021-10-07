import React from 'react'
import './Story.css'

class Story extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: null,
      counter: 0
    }
    this.onUpVoteClick = this.onUpVoteClick.bind(this)
    this.onDownVoteClick = this.onDownVoteClick.bind(this)

    console.log('The props passed to the Story component were: ' + props)
  }

  onUpVoteClick() {
    const id = this.props.story.id
    this.setState({ counter: this.state.counter + 1 })
    this.props.postVote(id, 'up')
  }
  onDownVoteClick() {
    const id = this.props.story.id
    this.setState({ counter: this.state.counter - 1 })
    this.props.postVote(id, 'down')
  }

  render() {
    const { title, SCORE, url } = this.props.story

    return (
      <li>
        <button onClick={this.onUpVoteClick} className="upvote">
          ⬆
        </button>
        <button onClick={this.onDownVoteClick} className="downvote">
          ⬇
        </button>
        <a className="title" href={url}>
          {title}
        </a>{' '}
        ({SCORE + this.state.counter} points)
      </li>
    )
  }
}

export default Story
//

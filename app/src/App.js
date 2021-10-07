import './App.css'
import React, { useState } from 'react'
import Story from './Story'
import Particles from 'react-particles-js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stories: [],
      loading: false,
      emptyStory: false,
      title: '',
      URL: ''
    }
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleURLChange = this.handleURLChange.bind(this)
    this.postSubmit = this.postSubmit.bind(this)
  }

  async componentDidMount() {
    await this.fetchData()
  }

  async fetchData() {
    this.setState({ loading: true })
    let response = await fetch('http://localhost:8080/stories')
    let json = await response.json()
    if (typeof json !== 'undefined' && json.length === 0) {
      this.setState({ emptyStory: true, loading: false })
    } else {
      this.setState({ stories: json, loading: false })
    }
  }

  async postVote(id, direction) {
    const messageBody = {
      direction: direction
    }
    let response = await fetch(`http://localhost:8080/stories/${id}/votes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageBody)
    })
    let json = await response.json()

    this.fetchData()
  }

  getStoriesComponentList(stories) {
    return stories.map((story) => (
      <Story
        key={story.title}
        story={story}
        postVote={(id, direction) => this.postVote(id, direction)}
      />
    ))
  }

  getLoadingComponent() {
    return <div class="loader" />
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value })
  }
  handleURLChange(e) {
    this.setState({ URL: e.target.value })
  }

  async postSubmit(title, url) {
    if (title !== '' || url !== '') {
      const messageBody = {
        title: title,
        URL: url,
        SCORE: 1
      }
      let response = await fetch(`http://localhost:8080/stories/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageBody)
      })
      let json = await response.json()
    } else {
      alert('You need to include a valid title or url!')
    }
    this.fetchData()
  }

  render() {
    const title = this.state.title
    return (
      <div className="App">
        <Particles
          className="particlesJs"
          params={{
            particles: {
              line_linked: {
                shadow: {
                  enable: true,
                  color: '#3CA9D1',
                  blur: 5
                }
              }
            }
          }}
        />
        <header>
          <div class="header">
            <div class="sides"></div>
            <div class="sides"> </div>
            <div class="info">
              <h4>
                <a href="#category">Reddit Clone</a>
              </h4>
              <h1>Very Good Website</h1>
              <div class="meta">
                <br />
                By <a target="_b">Gurpartap Singh</a> on October 6, 2021
              </div>
            </div>
          </div>
        </header>
        <header>
          <h2>Submit a story</h2>
          <div className="container">
            <form>
              <label for="fname">Title</label>
              <input
                type="text"
                id="fname"
                onChange={this.handleTitleChange}
                placeholder="Kim Kardashian ate a burger, WOW..."
              />
              <label for="lname">URL</label>
              <input
                onChange={this.handleURLChange}
                type="text"
                id="lname"
                placeholder="https://"
              />
              <input
                onClick={() => {
                  this.postSubmit(this.state.title, this.state.URL)
                }}
                type="submit"
              />
            </form>
          </div>
        </header>
        <main className="main" id="mainBody">
          <h2>Top Stories</h2>
          {this.state.loading
            ? this.getLoadingComponent()
            : this.getStoriesComponentList(this.state.stories)}
          {(this.state.emptyStory === true) & (this.state.loading === false)
            ? 'No stories Yet'
            : null}
        </main>
      </div>
    )
  }
}

export default App
//

import React, { PureComponent } from 'react'

import window from 'global/window'
import document from 'global/document'

export default class ScrollListener extends PureComponent {

  state = {
    scroll: 0,
    element: this.props.element || document.body,
    container: this.props.container || (typeof window !== 'undefined' ? window : undefined)
  }

  componentDidMount () {
    const { element, container } = this.state

    this.setState({scroll: element.scrollTop})

    container.addEventListener('scroll', this.recordPosition)
  }

  componentWillUnmount () {
    const { container } = this.state
    container.removeEventListener('scroll', this.recordPosition)
  }

  recordPosition = event => {
    const { onScroll } = this.props

    let scrollTop

    if (document.scrollingElement) {
      scrollTop = document.scrollingElement.scrollTop
    } else {
      if (event.target === document) {
        scrollTop = event.target.body.scrollTop
      } else {
        scrollTop = event.target.scrollTop
      }
    }

    onScroll(scrollTop, event)
    this.setState({ scroll: scrollTop })
  }

  render () {
    return null
  }
}

import React from 'react'
import { Component } from "react";
import fourHundredFour from '@/assets/images/error/404error.jpg'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    console.log('error: ', error);
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트
    return { hasError: true, message: error };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 리포팅 서비스에 에러를 기록
    console.log('error: ', error);
    console.log('errorInfo: ', errorInfo);
  }

  render() {
    console.log('this.state.hasError::' + this.state.hasError)
    if (this.state.hasError) {
      const hasError = this.state.hasError
      const errorMessage = this.state.message
      console.log('message::' + errorMessage.toString())
      const idx = errorMessage.toString().indexOf('imported module')
      this.state.hasError = '';
      this.state.message = '';
      //this.setState = ({ hasError: false, message:'' });
      if(hasError && idx > -1) {
        return  <div id='404'>
                  <img alt='404' src={fourHundredFour} />
                </div>
      } else if (hasError) {
        return  <div>
                  <h1>에러가 발생했습니다. 로그를 확인 하세요.</h1>
                </div>
      }
    }
    return this.props.children;
  }
}
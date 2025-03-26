import React from 'react'
import {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookDetailModal = ({show, setShow, action, bookNo}) => {
  const [bookTitle, setBookTitle] = useState(''); //제목
  const [bookWriter, setBookWriter] = useState(''); //작성자
  const [publisher, setPublisher] = useState(''); //출판사
  const [bookPrice, setBookPrice] = useState(''); //가격
  const [bookCnt, setBookCnt] = useState(''); //재고

  const [image, setImage] = useState({});  //첨부파일객체
  const [fileStatus, setFileStatus] = useState({}); // 첨부 상태

  const navigate = useNavigate();
  //로드시 상세조회
  useEffect(()=>{
    console.log('bookNo::'+ bookNo);
    //상세조회
    if(bookNo) searchDetail();
    else {
      setBookTitle('');
      setBookWriter('');
      setPublisher('');
      setBookPrice('');
      setBookCnt('');

    }

  },[bookNo])
  
  const searchDetail= () => {
    if (bookNo) {
      axios.get(`/api/books/${bookNo}`)  // bookNo를 URL에 포함
          .then((res) => {
              console.log('bookDetail res start!!');
              console.log(res);

              const result = res.data.result;
              console.log(result);
              setBookTitle(result.bookTitle);
              setBookWriter(result.bookWriter);
              setPublisher(result.publisher);
              setBookPrice(result.bookPrice);
              setBookCnt(result.bookCnt);
          })
          .catch((err) => {
              alert(err);
          });
   }
  }
  //저장
  const saveBook = () => {
    console.log('save notice start!!');
    if(action === 'N') {// 신규
      //let params = new URLSearchParams();
      const  formData = new FormData();
      formData.append('bookTitle', bookTitle);
      formData.append('bookWriter', bookWriter);
      formData.append('publisher', publisher);
      formData.append('bookPrice', bookPrice);
      formData.append('bookCnt', bookCnt);

      axios({
        method: "post",
        url: "/api/books",
        header: {
          "Content-Type": "application/json"
        },
        data: formData
      })
      .then((res) => {
        alert("저장이 완료되었습니다.");

        //모달창닫기
        modalClose();

        //화면리프레쉬
        navigate(0);

      })
      .catch((err)=>{
        alert(err);
      })
    } else if(action === 'U') { // 수정
      //let params = new URLSearchParams();
      const  formData = new FormData();
      formData.append('bookNo', bookNo);
      formData.append('bookCnt', bookCnt);
      
//return;
      //axios.post('/api/system/noticeUpdate.do',params)
      axios({
        method: "put",
        url: "/api/books",
        header: {
          "Content-Type": "application/json"
        },
        data: formData
      })
      .then((res) => {
        alert("수정이 완료되었습니다.");

        //모달창닫기
        modalClose();

        //화면리프레쉬
        navigate(0);

      })
      .catch((err)=>{
        alert(err);
      })
    }
  }
  //삭제
  const deleteBook = () => {
    console.log('delete notice start!!');
    if(window.confirm("정말 삭제하시겠습니까?")) {
      if(action === 'U') {
        let params = new URLSearchParams();
        params.append('bookNo', bookNo);

        axios.delete('/api/books',{params})
        .then((res) => {
          alert('삭제가 완료되었습니다.');
          //모달창닫기
          modalClose();

          //화면리프레쉬
          navigate(0);

        })
        .catch((err)=>{
          alert(err);
        })
      }
    }
  }

  //상세창 닫기
  const modalClose = () => {
    setShow(false);
    setBookTitle('');
    setBookWriter('');
    setPublisher('');
    setBookPrice('');
    setBookCnt('');
  }
  
  return (
    <div>
     <Modal show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{action==='N'?'book 등록':'book 재고 수정'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row mb-1">
          <label htmlFor="bookNo" className="col-sm-3 col-form-label">공지번호</label>
          <div className="col-sm-9">
            <input type="input" id="bookNo" className="form-control" disabled value={bookNo} />
          </div>
        </div>
       
        <div className="row mb-1">
          <label htmlFor="bookTitle" className="col-sm-3 col-form-label">제목</label>
          <div className="col-sm-9">
            <input 
              type="input" 
              id="bookTitle" 
              disabled={action === 'U'}
              className="form-control" 
              value={bookTitle}
              onChange={(e)=>setBookTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-1">
          <label htmlFor="bookWriter" className="col-sm-3 col-form-label">저자</label>
          <div className="col-sm-9">
            <input type="input" id="bookWriter" className="form-control" disabled={action === 'U'} value={bookWriter} onChange={(e)=>setBookWriter(e.target.value)}/>
          </div>
        </div>
        <div className="row mb-1">
          <label htmlFor="publisher" className="col-sm-3 col-form-label">출판사</label>
          <div className="col-sm-9">
            <input type="input" id="publisher" className="form-control" disabled={action === 'U'} value={publisher} onChange={(e)=>setPublisher(e.target.value)}/>
          </div>
        </div>
        <div className="row mb-1">
          <label htmlFor="bookPrice" className="col-sm-3 col-form-label">가격</label>
          <div className="col-sm-9">
          <input 
              type="input" 
              id="bookPrice" 
              className="form-control" 
              disabled={action === 'U'}
              value={bookPrice}
              onChange={(e) => setBookPrice(e.target.value.replace(/[^0-9]/g, ''))}
            />
          </div>
        </div>
        <div className="row mb-1">
          <label htmlFor="bookCnt" className="col-sm-3 col-form-label">재고량</label>
          <div className="col-sm-9">
          <input 
              type="input" 
              id="bookCnt" 
              className="form-control" 
              value={bookCnt}
              onChange={(e) => setBookCnt(e.target.value.replace(/[^0-9]/g, ''))}
            />
          </div>
        </div>

  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={saveBook}>
          {action==='N'?'등록':'수정'}
          </Button>
          {action ==='U' && <Button variant="danger" onClick={deleteBook}>
            삭제
          </Button>}
          <Button variant="secondary" onClick={modalClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>  
  )
}

export default BookDetailModal

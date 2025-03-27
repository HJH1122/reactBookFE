import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios';
import Pagination from '../../components/common/Pagination';
import BookDetailModal from '../../components/system/BookDetailModal';

const Book = () => {
  const [action, setAction] = useState('');
  const [show, setShow] = useState(false);
  const [bookNo, setBookNo] = useState('');

    const [searchKey, setSearchKey] = useState('');
    const [keyword, setKeyword] = useState('');
    const [bookList, setBookList] = useState([]);

    //페이징 관련
    const blockSize = 5;
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
 

    // 북 신규
    const newReg=() => {
      //모달
      setShow(true);
      setAction('N'); // 북북 신규모드
      setBookNo('');
    }  

    //북 상세
    const searchDetail = (bookNo) => {
      //모달
      setShow(true);
      setAction('U'); //북 수정모드
      setBookNo(bookNo);
    }

    // 북 삭제
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


  //로드시 조회
  useEffect(()=>{
    searchList();
  }, [])

  //검색호출
  const searchList = (cPage) => {
    console.log('searchList start');
    cPage = cPage || 1;
    setCurrentPage(cPage);
    console.log(cPage);
    console.log(currentPage);
    let params = new URLSearchParams();
    params.append('option', searchKey);
    params.append('keyword', keyword);

    params.append('currentPage', cPage);
    params.append('pageSize', pageSize);

   
    axios.get('/api/books', {params})
    .then((res)=>{
      console.log('response start');
      console.log(res);

      setBookList(res.data.bookList);

      setTotalPage(Math.ceil(res.data.bookCnt / pageSize)); //총페이지

    })
    .catch((err) =>{
      console.log(err);
    })

  }

  return (
    <div id="notice">
     <p className="conTitle">
        <span>book 목록</span>
      </p>

    <span>
      <table
        style={{border: '1px #50bcdf'}}
        width="100%"
        cellPadding="5"
        cellSpacing="0"
        border="1"
        align="left"
      >
        <thead>
        <tr style={{border: '0px', borderColor: 'blue'}}>
          <td
            width="50"
            height="25"
            style={{fontSize: '100%', textAlign: 'left'}}
          >
            <div id="searchArea" className="d-flex justify-content-around mb-2 mt-2">
              <select
                id="searchKey"
                className="form-select"
                style={{width: '100px', height: '38px'}}
                onChange={(e) => {
                  setSearchKey(e.target.value)
                }}
              >
                <option value="">전체</option>
                <option value="1">제목</option>
                <option value="2">저자</option>
              </select>

              <input
                type="text"
                style={{width: '200px'}}
                className="form-control"
                onChange={(e) => {
                  setKeyword(e.target.value)
                }}
              />


              <span className="fr">
                <button
                  className="btn btn-primary mx-2"
                  id="btnSearchNotice"
                  name="btn"
                  onClick={() => searchList(currentPage)}
                >
                  <span>검 색</span>
                </button>
                <button
                  className="btn btn-primary"
                  onClick={()=> newReg()}
                >
                  <span>신규등록</span>
                </button>
              </span>
            </div>
          </td>
        </tr>
        </thead>
      </table>
    </span>
    <div className="divComGrpCodList">

      <table className="col">
        <caption>
          caption
        </caption>
        <colgroup>
          <col width="15px" />
          <col width="80px" />
          <col />
          <col width="100px" />
          <col width="100px" />
          <col width="100px" />
          <col width="100px" />
        </colgroup>

        <thead>
          <tr>
            <th scope="col" width="90px">번호</th>
            <th scope="col" width="150px">이미지</th>
            <th scope="col" width="550px">제목</th>
            <th scope="col" width="250px">저자</th>
            <th scope="col" width="250px">출판사</th>
            <th scope="col" width="200px">가격</th>
            <th scope="col" width="200px">재고량</th>
          </tr>
        </thead>
        <tbody>
          {bookList.map((item, index) => {
            return(
              <tr key={index}>
                <td>{item.bookNo}</td>
                <td>
                    {/* 하드코딩된 이미지 URL */}
                    <img
                      src="https://placehold.co/600x400"  // 예시로 임시 이미지를 사용
                      alt="book image"
                      style={{
                        maxWidth: '100px',   // 최대 너비
                        maxHeight: '150px',  // 최대 높이
                        objectFit: 'cover'   // 비율 유지하면서 잘림 방지
                      }}
                    />
                  </td>
                <td style={{cursor: 'pointer'}} onClick={() => {searchDetail(item.bookNo)}}>{item.bookTitle}</td>
                <td>{item.bookWriter}</td> 
                <td>{item.publisher}</td> 
                <td>{item.bookPrice}원</td>
                <td>{item.bookCnt}권</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* 페이징 처리 */}
      <div
          style={{
            display: 'flex',
            justifyContent: 'center', // 수평 중앙 정렬
            marginTop: '20px', // 상단 여백
          }}
        >
      <Pagination 
        currentPage={currentPage}
        totalPage={totalPage}
        blockSize={blockSize}
        onClick ={searchList}
      />
    </div>
    </div>
    <BookDetailModal
      show={show} 
      setShow={setShow} 
      action={action} 
      bookNo={bookNo}
    />
  </div>
  )
}

export default Book

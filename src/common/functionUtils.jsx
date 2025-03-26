import {useState} from 'react'

export function getImageUrl(person, size) {
  return(
    'https://i.imgur.com/' + person.imageId + size + '.jpg'
  );
}

//if문사용
export function Item({name, isPacked}) {
  if(isPacked) {
    return(<li>{name} ✔</li>)
  }
  return(<li>{name}</li>)
}

//삼항연산자
export function Item2({name, isPacked}) {
  return(<li>{isPacked? name + ' ✔': name}</li>)
}

//&& , ||
export function Item3({name, isPacked}) {
  return(<li>{name} {isPacked && ' ✔'}</li>)
}

export function AlertButton({message, children}) {
  return(<>
    <button className="btn btn-secondary" onClick={() => alert(message)}>
      {children}
    </button>
  </>)
}


export function SmashButton({onSmash, children}) {
  return(<>
    <button className="btn btn-secondary" onClick={onSmash}>
      {children}
    </button>
  </>)
}

//propagation
export function Toolbar() {
  return(<>
    <div onClick={() => {
      alert('상위 div 전달!')
    }}>
      <button className="btn btn-secondary" onClick={(e) => {
        e.stopPropagation()
        alert('전달!')
        }}>
        상위까지 전달
      </button>
    </div>
  </>)
}

export function ChangeButtonColor() {
  const handleClick = (e) => {
    if(e.target.style.backgroundColor === 'blue') {
      e.target.style.backgroundColor = 'white'
    } else {
      e.target.style.backgroundColor = 'blue'
    }
  }
  return(<>
    <button onClick={handleClick}>
      버튼 색변경
    </button>
  </>)
}

//custom hook
export function useInput(initialValue, submitAction) {

  const [inputValue, setInputValue] = useState(initialValue)

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = () => {
    setInputValue("");
    submitAction(inputValue);
  }

  return [inputValue, handleChange, handleSubmit]
}
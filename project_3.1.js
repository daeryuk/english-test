//속성 조작
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('gam').setAttribute('href', 'https://gradium.co.kr/persimmon-benefits/')
})
//스타일 조작
document.addEventListener('DOMContentLoaded', () => {
  //요소를 읽어들임
  const box = document.querySelectorAll('#bgw')
  //텍스트와 스타일을 변경
  box.forEach((bg) => {
    bg.style.backgroundColor = 'white'
    bg.style.opacity = '0.8'
    bg.style.borderRadius = '20px'
    bg.style.padding = '20px'
    bg.style.margin = '20px'
  })
})
//contents 변경-추석 채소 품목 할인
document.addEventListener('DOMContentLoaded', () => {
  //요소를 읽어들임
  const sales = document.querySelectorAll('h2')
  //텍스트와 스타일을 변경
  sales.forEach((sl) => {
    sl.textContent = '스페셜 S.A.L.E'
    sl.style.textAlign = 'center'
    sl.style.color = 'white'
    sl.style.backgroundColor = 'red'
    sl.style.padding = '10px'
  })
})
//글자 입력 양식 이벤트
document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#uemail');
  const pOne = document.querySelector('p1');
  const form = document.querySelector('form');
  const submitBtn = document.querySelector('input[type="submit"]');

  const isEmail = (value) => {
    return (value.indexOf('@') >= 1) && (value.split('@')[1].indexOf('.') > 1);
  };

  input.addEventListener('keyup', (event) => {
    const value = event.currentTarget.value;
    if (isEmail(value)) {
      pOne.style.color = 'green';
      pOne.textContent = `올바른 이메일 형식입니다: ${value}`;
      /*이메일 양식이 갖춰지기 전까지 버튼 비활성화 */
      submitBtn.removeAttribute('disabled'); 
    } else {
      pOne.style.color = 'red';
      pOne.textContent = `이메일 형식이 아닙니다: ${value}`;
      submitBtn.setAttribute('disabled', 'disabled');
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('양식이 제출되었습니다.');
  });

  const resetBtn = document.querySelector('input[type="reset"]');
  resetBtn.addEventListener('click', () => {
    pOne.style.color = '';
    pOne.textContent = '';
  });
});
//글자 입력 양식 이벤트
document.addEventListener('DOMContentLoaded', () => {
  //옵션 선택 제공
  const select = document.querySelector('select')
  const p = document.querySelector('p2')

  select.addEventListener('change', (event)=>{
    const options = event.currentTarget.options
    const index = event.currentTarget.options.selectedIndex
    
    p.textContent = `선택된 지점: ${options[index].textContent}`
  })
})
//생성 또는 이동
document.addEventListener('DOMContentLoaded', () => {
  //문서 객체 생성하기
  const divA = document.querySelector('#first')
  const divB = document.querySelector('#second')
  const h1 = document.createElement('h1')
  h1.textContent = '💨💨💨🚀'

  //서로 번갈아가면서 실행하는 함수 구현
  const toFirst =  () => {
    divA.appendChild(h1)
    setTimeout(toSecond, 1000)
  }
  const toSecond = () => {
    divB.appendChild(h1)
    setTimeout(toFirst, 1000)
  }
  toFirst()
})
//제거
document.addEventListener('DOMContentLoaded', () => {
  //문서 객체 생성하기
  setTimeout(() => {
    const h3 = document.querySelector('h3')
    h3.parentNode.removeChild(h3)
  }, 3000)
})
//마우스 이벤트
window.onload = function(){
  var target = document.querySelector('#box')
  target.addEventListener('mouseover', function(){
      target.style.backgroundColor = '#FF88A7'
  })
  target.addEventListener('mouseout', function(){
    target.style.backgroundColor = '#FFB182'
})
}
//키보드 이벤트
window.addEventListener("keydown", e => {
  const key = document.getElementById(e.key);
  if (key) key.classList.add('pressed');
});
window.addEventListener("keyup", e => {
  const key = document.getElementById(e.key);
  if (key) key.classList.remove('pressed');
});
//체크 박스 활용
document.addEventListener('DOMContentLoaded', () => {
  let [timer, timerId] = [0,0]
  const h4 = document.querySelector('h4')
  const checkbox = document.querySelector('input')

  checkbox.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      timerId = setInterval(() => {
        timer += 1
        h4.textContent = `${timer}초`
      }, 1000)
    } else {
      //체크 해제 상태
      clearInterval(timerId)
    }
  })
})
//나만의 임시 쇼핑 목록
document.addEventListener('DOMContentLoaded', () => {
  //문서 객체를 가져온다
  const input = document.querySelector('#shopping')
  const shoppinglist = document.querySelector('#shopping-list')
  const addButton = document.querySelector('#add-button')

  //변수 선언
  let keyCount = 0

  //함수 선언
  const addShopping = () => {
    //입력 양식이 내용에 없으면 추가 x
    if (input.value.trim() === ''){
      alert('구매희망상품을 목록에 입력해주세요')
      return
    }
    //문서 객체를 설정
    const item = document.createElement('div')
    const checkbox = document.createElement('input')
    const text = document.createElement('span')
    const button = document.createElement('button')
    
    //문서 객체를 식별할 키를 생성한다
    const key = keyCount
    keyCount += 1
    
    item.setAttribute('data-key', key)
    item.appendChild(checkbox)
    item.appendChild(text)
    item.appendChild(button)
    shoppinglist.appendChild(item)
    
    //checkbox 객체를 조작한다
    checkbox.type = 'checkbox'
    checkbox.addEventListener('change', (event) => {
      //체크 박스를 클릭하면 선을 그어줌
      item.style.textDecoration
      = event.target.checked ? 'line-through' : ''
    })
    
    //text 객체를 조작 <span>글자</span>
    text.textContent = input.value

    //button 객체를 조작함
    button.textContent = '제거하기'
    button.addEventListener('click', () => {
      removeShopping(key)
    })
    
    //입력 양식의 내용을 비운다
    input.value = ''
  }

  const removeShopping = (key) => {
    //식별 키로 문서 객체를 제거함
    const item = document.querySelector(`[data-key="${key}"]`)
    shoppinglist.removeChild(item)
  }

  //이벤트 연결
  addButton.addEventListener('click', addShopping)
  input.addEventListener('keyup', (event) => {
    //입력 양식에서 엔터 키를 누르면 바로 addShopping
    const ENTER = 13
    if (event.keyCode === ENTER){
      addShopping()
    }
  })
})
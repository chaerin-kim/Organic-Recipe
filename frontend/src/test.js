function solution(friends, gifts) {
  var answer = 0;
  
  const 받은선물 = new Array(friends.length).fill(0);
  const 선물지수 = new Array(friends.length).fill(0);
  const 다음달선물 = new Array(friends.length).fill(0);

  // function 선물지수계산() {
  //     for (let i = 0; i < gifts.length - 1; i++) {
  //         const [str1, str2] = gifts[i].split(' ');
  //         // 각 문자열에 해당하는 인덱스를 찾기
  //         const index1 = friends.indexOf(str1);
  //         const index2 = friends.indexOf(str2);
  //         받은선물[index1]++;

  //         선물지수[index1]++;
  //         선물지수[index2]--;
  //     }
  // };      
      

  //현재 받은 선물 계산
  const 선물지표 = Array.from({ length: friends.length }, () => new Array(friends.length).fill(0));

  function calculateGiftIndex() {
      for (let i = 0; i < gifts.length; i++) {
          const [giver, receiver] = gifts[i].split(' ');
          const giverIndex = friends.indexOf(giver);
          const receiverIndex = friends.indexOf(receiver);
          if (giverIndex !== -1 && receiverIndex !== -1) { // giver와 receiver가 friends 목록에 있는 경우에만 증가
              선물지표[giverIndex][receiverIndex]++;
              선물지수[index1]++;
              선물지수[index2]--;
          }
      }
  }


  
  if(주고 받은 수가 같다면){
      if(a>b){ a++ }
      elseif(b>a){ b++ }        
      
  } else {
      선물 더 준 사람에게 선물 추가
  }
  
  
  
  
  return answer;
  
}

//선물을 더 준 사람이 받는다

//두사람의 기록이 없거나, 주고 받은 수가 같다면 선물 지수가 큰사람이 받는다.
//선물 지수 = 준 선물지수 - 받은 선물 지수
// 선물 지수도 같다면 다음 달에 선물을 주고 받지 않음

// 선물을 가장 많이 받을 친구가 - 받을 선물의 수 ?
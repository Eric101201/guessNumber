;(function(){

    const i1 = document.querySelector('.i1')
    const i2 = document.querySelector('.i2')
    const scope = document.querySelector('.scope')
    const guess = document.querySelector('.guess')
    const guessInput = document.getElementById('guessInput')
    const guessBtn = document.querySelector('.guess button')
    const rand = document.getElementById('rand')
    const view = document.querySelector('.view')

    const numberTest = /^0-9$/
    
    const inputMin = document.getElementById('inputMin') 
    const inputMax = document.getElementById('inputMax')
    let strMax;
    let strMin;
    // 轉換後小的數字
    let numberMin;
    // 轉換後大得數字 
    let numberMax;
    // 介於大的數字
    let answerMax;
    // 介於小的數字
    let answerMin;
    // 猜多少次
    let count = 0;
    // 答案
    let answer;
    // 監聽Enter
    inputMin.addEventListener('keypress',function(event){
        if(event.key === 'Enter'){
            randRun()
        }
    })
    // 監聽Enter
    inputMax.addEventListener('keypress',function(event){
        if(event.key === 'Enter'){
            randRun()
        }
    })

    let strAnswerMin //view最小數字
    let strAnswerMax //view最大數字

    rand.addEventListener('click',randRun)

    function randRun(){
        rand.textContent = '產生數字';
        numberMin = parseInt(inputMin.value,10)
        numberMax = parseInt(inputMax.value,10)
        answerMax = numberMax;
        answerMin = numberMin;
        
        // 錯誤條件共用 避免寫更多if判斷
        if(numberMin >= numberMax){
            // 最小數字比最大數字還大時錯誤
            err()
        }else if(isNaN(inputMin.value) || isNaN(inputMax.value)){
            // 如果不是輸入數字型態就報錯
            err()
        }else if(inputMin.value === '' || inputMax.value === ''){
            // 如果是空值也報錯 不做trim
            err()
        }else if(!numberTest.test(numberMin)&&!numberTest.test(numberMax)){ 
            // console.log('ok')
            scope.style.display = 'block';
            i1.classList.remove('error')
            i2.classList.remove('error')
            inputMin.classList.remove('input_error')
            inputMax.classList.remove('input_error')
            guessInput.value='';
            answer = numberGet(numberMin,numberMax);
            strMax = String(numberMax).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            strMin = String(numberMin).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            strAnswerMin = strMin;
            strAnswerMax = strMax;
            scope.innerHTML=
            `
                <span>答案介於 <span style="font-size:40px;color:#0066CC">${strMin}</span> 至 <span style="font-size:40px;color:#0066CC">${strMax}</span> 之間</span>
            `
            // 清空
            view.innerHTML=
            `
                
            `
            count =0;
            guess.style.display = 'flex'
            i1.style.marginBottom = '5px'
            i2.style.marginBottom = '0'
        }else{
            // console.log('else')
            err()
        }
    }



    function numberGet(min, max) {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function err(){
        i1.classList.add('error')
        i2.classList.add('error')
        inputMin.classList.add('input_error')
        inputMax.classList.add('input_error')
        scope.innerHTML=
        `
        
        `
        guess.style.display = 'none';
        view.innerHTML=
        `
            
        `
        i1.style.marginBottom = '50px'
        i2.style.marginBottom = '50px'
    }
    guessInput.addEventListener('keypress',function(event){
        if(event.key === 'Enter'){
            guessRun()
        }
    })
    guessBtn.addEventListener('click',guessRun)
    function guessRun(){
        // 猜的數字
        let v = guessInput.value;
        // 轉換為數字型態
        v = parseInt(v,10);
        guessInput.value = '';
        // console.log(v)
        if(v === answer){
            count +=1;
            let strAns = String(answer).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            view.innerHTML=
            `
                <span>你猜的範圍是${strMin}~${strMax}</span><br>
                <span>答案是:<span style="font-size:40px;color:#EA0000">${strAns}</span>，你一共答了 ${count} </span> 次! (含本次)</span><br>
                <span>重新產生新的亂數可以再次遊玩</span>
            `
            rand.textContent = '產生新的數字'
            guess.style.display = 'none';
            scope.style.display = 'none';
        }else if(v < answerMin || v > answerMax){
            view.innerHTML=
            `
                <span">輸入的數字錯誤!<br>輸入的數字應為 <span style="font-size:40px;color:#0066CC">${strAnswerMin}</span> 至 <span style="font-size:40px;color:#0066CC">${strAnswerMax}</span> 之間</span>
            `
        }else if(v > answer){
            answerMax = v;
            count +=1;
            strAnswerMax = String(answerMax).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            view.innerHTML=
            `
                <span>猜的數字太高了，試著稍微降低吧!<br>答案介於 <span style="font-size:40px;color:#0066CC">${strAnswerMin}</span> 至 <span style="font-size:40px;color:#0066CC">${strAnswerMax}</span> 之間</span>
            `
        }else if(v < answer){
            answerMin = v;
            count +=1;
            strAnswerMin = String(answerMin).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            view.innerHTML=
            `
                <span>猜的數字太低了，試著稍微提高吧!<br>答案介於 <span style="font-size:40px;color:#0066CC">${strAnswerMin}</span> 至 <span style="font-size:40px;color:#0066CC">${strAnswerMax}</span> 之間</span>
            `
        }else{
            view.innerHTML=
            `
                <span>發生未預期錯誤，請確認輸入是否為數字。</span>
            `
        }

    }
})()
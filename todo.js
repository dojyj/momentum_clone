const toDoForm = document.querySelector(".js-toDoForm"),
 toDoInput = toDoForm.querySelector("input"),
 toDoList = document.querySelector(".js-toDoList");

 const TODOS_LS = "toDos";
 let toDos = [];

 // 삭제 버튼 클릭시 이벤트.
 function deleteToDos(event){
     // 버튼 element 가져오기 & 버튼이 부착되어있는 부모노드(li) 가져오기
    const btn = event.target;
    const li = btn.parentNode;

    // 삭제버튼이 부착되어있는 list 삭제
    toDoList.removeChild(li);

    // 방금 삭제된 li가 filter된 todolist를 만들고 이를 local에 저장.
    const cleanToDos = toDos.filter(toDo => {
        console.log(toDo.id, li.id);
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
 }

 // local에 저장. string형태로 변환필
 function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
 }

 // element 추가
 function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    // 삭제버튼 디자인 & 클릭 이벤트 부착
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDos);

    // span element생성후 미리 생성한 li element에 모두 부착, li id 부여 및 toDoList에 li 부착 
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    
    // todo 객체 생성하여 toDos배열에 push 후 local에 저장.
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();
 }
  
 // todo list 추가버튼 클릭 이벤트. 입력받은 값 치랗고 value 초기화
 function handleToDoSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
 }
 
 // localStorage의 todo list 가져오기. localStorage는 string 형태로만 저장되기 때문에 save & load시 변환 필요.
 // 가져온 list 뿌리기
 function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (toDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(element => {
            paintToDo(element.text);
        });
    }
 }

 // todo list 초기화
 function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleToDoSubmit);
 }

 init();
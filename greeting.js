const form = document.querySelector(".js-form"),
 input = form.querySelector("input"),
 greeting = document.querySelector(".js-greeting"),
 logoutBtn = document.querySelector(".js-logout");

 const USER_LS = "currentUser";
 const SHOWING_ON = "showing";

 // 로그아웃 버튼 클릭되면 localstorage의 사용자 이름 삭제한 뒤 페이지 새로고침.
 function handleLogOut(){
    localStorage.removeItem(USER_LS);
    greeting.classList.remove(SHOWING_ON);
    logoutBtn.classList.remove(SHOWING_ON);
    window.location.reload();
 }

 // 로그아웃 버튼 보여주기
 function addLogOutBtn(text){
    logoutBtn.classList.add("btn-showing");
    logoutBtn.addEventListener("click", handleLogOut);
 }

 // localstorage에 저장
 function saveName(text){
    localStorage.setItem(USER_LS, text);
 }

 // 환영하는 페이지로 새로고침. form 형식 삭제한 뒤, 환영 메세지 및 로그아웃 버튼 update
 function paintGreeting(text){
    form.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    greeting.innerText = `Hi! ${text}, It's 2021`;
    addLogOutBtn();
 }

 // 사용자 이름 입력 받으면 기존 event의 행동을 막고 ( submit 후 새로고침 )
 // 새로고침 & 입력받은 이름 local storage에 저장
 function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    saveName(currentValue);
    window.location.reload();
 }

 // 사용자 이름 입력받는 form 띄우기
 function askForName(){
     form.classList.add(SHOWING_ON);
     form.addEventListener("submit", handleSubmit)
 }
 
 // 사용자 이름이 local storage에 저장되어 있을 경우  => 환영 메세지 & logout btn on
 // 사용자 이름이 local storage에 저장되어 있지 않은 경우 => 사용자 이름 받는 버튼 on
 function loadName(){
     const currentUser = localStorage.getItem(USER_LS);
     if (currentUser === null){
        askForName();
     }else {
        paintGreeting(currentUser);
     }
 }

 // greeting start
 function init() {
    input.value = "";
    loadName();
 }

 init();
 
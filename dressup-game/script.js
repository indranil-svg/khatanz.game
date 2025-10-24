/* ================================
   🧩 DRESS-UP GAME SCRIPT (수정버전)
================================ */

// 각 레이어 요소 가져오기
const layers = {
  character: document.getElementById("character"),
  hair: document.getElementById("hair"),
  top: document.getElementById("top"),
  bottom: document.getElementById("bottom"),
  dress: document.getElementById("dress"),
  shoes: document.getElementById("shoes"),
  hat: document.getElementById("hat"),
  acc: document.getElementById("acc"),
};

const categories = document.querySelectorAll("[data-cat]");
const itemList = document.getElementById("itemList");

/* ------------------------------------------------------
   1️⃣ 카테고리 버튼 클릭 시 아이템 로드
------------------------------------------------------ */
categories.forEach((btn) => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.cat;
    loadItems(cat);
  });
});

/* ------------------------------------------------------
   2️⃣ 각 카테고리 이미지 목록 로드
------------------------------------------------------ */
function loadItems(category) {
  itemList.innerHTML = ""; // 기존 아이템 제거

  let totalItems = 0;

  switch (category) {
    case "character":
      totalItems = 2; // char1.png, char2.png
      break;
    case "hair":
    case "tops":
    case "bottoms":
    case "dress":
    case "shoes":
    case "hats":
    case "acc":
      totalItems = 5; // 예시: 1.png ~ 5.png
      break;
    default:
      totalItems = 0;
  }

  for (let i = 1; i <= totalItems; i++) {
    const img = document.createElement("img");

    if (category === "character") {
      img.src = `assets/characters/char${i}.png`;
    } else {
      img.src = `assets/${category}/${i}.png`;
    }

    img.className = "item-thumb";
    img.alt = `${category} ${i}`;
    img.addEventListener("click", () => applyItem(category, img.src));
    itemList.appendChild(img);
  }
}

/* ------------------------------------------------------
   3️⃣ 아이템 적용 (캐릭터 변경 포함)
------------------------------------------------------ */
function applyItem(category, src) {
  // tops/bottoms/hats → 실제 레이어 이름으로 매핑
  if (category === "tops") category = "top";
  if (category === "bottoms") category = "bottom";
  if (category === "hats") category = "hat";

  // 캐릭터 선택 시 다른 옷은 유지하면서 캐릭터만 교체
  if (category === "character") {
    layers.character.src = src;
    return;
  }

  // dress 선택 시 top/bottom 초기화
  if (category === "dress") {
    layers.top.src = "";
    layers.bottom.src = "";
  }

  // top/bottom 선택 시 dress 초기화
  if (category === "top" || category === "bottom") {
    layers.dress.src = "";
  }

  if (layers[category]) {
    layers[category].src = src;
  }
}

/* ------------------------------------------------------
   4️⃣ 포토존 이동 (현재 상태 저장)
------------------------------------------------------ */
document.getElementById("photoBtn").addEventListener("click", () => {
  const current = {};
  for (let [key, img] of Object.entries(layers)) {
    current[key] = img.src || "";
  }
  localStorage.setItem("dressupData", JSON.stringify(current));
  window.location.href = "photo.html";
});

/* ------------------------------------------------------
   ✅ 초기 실행 시 기본 카테고리 표시
------------------------------------------------------ */
window.addEventListener("load", () => {
  loadItems("character");
});

const form = document.querySelector("#searchForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  try {
    const foodSearch = form.elements.query.value;
    const res = await axios.get(
      `https://api.spoonacular.com/food/wine/pairing?apiKey=fefb8af058a349759bd93f310a649733&food=${foodSearch}`
    );
    console.log(res.data);
    makeWine(res.data);
    form.elements.query.value = "";
  } catch (err) {
    alert("Error, please try again later", err);
  }
});

const makeWine = (result) => {
  if (
    result.productMatches.length > 0 &&
    result.productMatches[0].title !== "null"
  ) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card text-center";
    const wineHeader = document.createElement("h2");
    const img = document.createElement("img");
    img.className = "card-img-top";
    const wineText = document.createElement("p");

    wineHeader.innerHTML = `${form.elements.query.value} can be paired with: ${result.productMatches[0].title}`;
    img.src = result.productMatches[0].imageUrl;
    wineText.innerHTML = result.pairingText;

    cardDiv.append(wineHeader, img, wineText);
    document.body.append(cardDiv);
  } else if (result.productMatches.length == 0) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card text-center";
    const wineText = document.createElement("p");
    wineText.innerHTML = result.pairingText;
    cardDiv.append(wineText);
    document.body.append(cardDiv);
  }
};

const clearResultsBtn = document.querySelector("#clearResultsBtn");

clearResultsBtn.addEventListener("click", () => {
  let elements = document.querySelectorAll(".card");
  for (element of elements) {
    element.remove();
  }
  clearResultsBtn.style.backgroundColor = "black";
});

const pairingBtn = document.querySelector("#pairingBtn");

pairingBtn.addEventListener("click", () => {
  pairingBtn.style.backgroundColor = "black";
});

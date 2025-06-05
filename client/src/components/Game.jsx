import React, { useState } from 'react';

export default function Game() {
  const data = [
    ['Cairo', 'Egypt'],
    ['Uk', 'london'],
    ['paric', 'france'],
  ];

  const randomData = data.flat().sort(() => {
    return Math.random() - 0.5;
  });

  const [Cards, setCards] = useState(randomData);
  let temp = 0;
  let click = 0;

  const CaptialHandler = (element) => {
    console.log(element);
    if (click == 0) {
      temp = element;
      click = 1;
      console.log('First Click');
    } else {
      console.log('Second Click');
      click = 0;
      console.log(temp, element);

      const tempValue = randomData[temp];
      const elementValue = randomData[element];

      console.log(elementValue);
      console.log(tempValue);

      let isMatch = 1;

      if (isMatch) {
        const updatedCards = [...randomData];
        updatedCards.splice(temp, 1);
        updatedCards.splice(element, 1);

        console.log(updatedCards);
        setCards(updatedCards);
      } else {
        const updatedCards = [...randomData];
        updatedCards[temp] = data.flat()[temp];
        updatedCards[element] = data.flat()[element];
        setCards(updatedCards);
      }
    }
    const updatedCards = [...randomData];
    updatedCards[element] = (
      <span className="bg-amber-500 w-full h-full flex items-center justify-center">{Cards[element]}</span>
    );
    // setCards(updatedCards);

    // console.log(element);
  };

  return (
    <div className="flex flex-col items-center  min-h-screen">
      <h1 className="text-3xl mb-4">Captial Game</h1>
      <div className="flex flex-wrap gap-2 justify-center">
        {Cards.map((element, ind) => (
          <div
            className="w-20 h-20 flex items-center justify-center border rounded shadow cursor-pointer hover:bg-amber-500"
            onClick={() => CaptialHandler(ind)}
            key={ind}>
            {element}
          </div>
        ))}
      </div>
    </div>
  );
}

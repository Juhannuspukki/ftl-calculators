import React, { useState, useEffect } from "react";

const basicSkillMultiplier = {
  0: 0,
  1: 0,
  2: 12,
  3: 24,
  4: 36,
  5: 50,
}

const advancedSkillMultiplier = {
  0: 0,
  1: 0,
  2: 0,
  3: 10,
  4: 20,
  5: 30,
}

const expertSkillMultiplier = {
  0: 0,
  1: 0,
  2: 0,
  3: 6,
  4: 12,
  5: 20,
}

const shipData = [
  {
    name: "Frigate (T4, T5)",
    probabilityPerDebris: 50,
    maxDebris: 2
  },
  {
    name: "Frigate (T5 Covert Ops)",
    probabilityPerDebris: 43,
    maxDebris: 2
  },
  {
    name: "Frigate (T6, T7, T8)",
    probabilityPerDebris: 50,
    maxDebris: 1
  },
  {
    name: "Destroyer (T4)",
    probabilityPerDebris: 35.5,
    maxDebris: 2
  },
  {
    name: "Destroyer (T5)",
    probabilityPerDebris: 30,
    maxDebris: 2
  },
  {
    name: "Destroyer (T6)",
    probabilityPerDebris: 31,
    maxDebris: 2
  },
  {
    name: "Destroyer (T7)",
    probabilityPerDebris: 33.5,
    maxDebris: 2
  },
  {
    name: "Cruiser (T5)",
    probabilityPerDebris: 15,
    maxDebris: 4
  },
  {
    name: "Cruiser (T6, T7, T8)",
    probabilityPerDebris: 16.67,
    maxDebris: 3
  },
  {
    name: "Combat Battlecruiser (T7)",
    probabilityPerDebris: 12,
    maxDebris: 4
  },
  {
    name: "Combat Battlecruiser (T8)",
    probabilityPerDebris: 11,
    maxDebris: 4
  },
  {
    name: "Assault Battlecruiser (T8)",
    probabilityPerDebris: 11.5,
    maxDebris: 4
  },
  {
    name: "Faction Frigate",
    probabilityPerDebris: 50,
    maxDebris: 1
  },
  {
    name: "Faction Cruiser",
    probabilityPerDebris: 8,
    maxDebris: 4
  },
  {
    name: "Faction Battleship",
    maxDebris: 21
  }
]


export default function Home() {
  const [selectedBasicSkill, setSelectedBasicSkill] = useState(0)
  const [selectedAdvancedSkill, setSelectedAdvancedSkill] = useState(0)
  const [selectedExpertSkill, setSelectedExpertSkill] = useState(0)
  const [selectedShipClass, setSelectedShipClass] = useState("Frigate (T4, T5)")
  const [debrisCount, setDebrisCount] = useState(1)
  const [debrisCost, setDebrisCost] = useState(0)
  const [otherExpenses, setOtherExpenses] = useState(0)
  
  const maxDebris = shipData.find(ship => ship.name === selectedShipClass).maxDebris
  
  useEffect(
    () => {
      setDebrisCount(maxDebris)
    },
    [selectedShipClass],
  );
  
  const successMultiplier =
    basicSkillMultiplier[selectedBasicSkill]
    + advancedSkillMultiplier[selectedAdvancedSkill]
    + expertSkillMultiplier[selectedExpertSkill]
  
  const probabilityPerDebris = shipData.find(ship => ship.name === selectedShipClass).probabilityPerDebris
  
  const calculateSuccessChance = () => {
    if (selectedShipClass === "Faction Battleship") {
      return  (1.45 * debrisCount - 0.45) * (1 + successMultiplier / 100)
    } else {
      const probability = probabilityPerDebris * debrisCount * (1 + successMultiplier / 100)
      return probability > 100 ? 100 : probability
    }
  }
  
  console.log(typeof debrisCost)
  const researchCost = (1 / (calculateSuccessChance() * 0.01)  * (parseFloat(debrisCost) * debrisCount + parseFloat(otherExpenses))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  
  return (
    <main>
      <div className={"container"}>
        <h2>Your skills</h2>
        <div className={"row"}>
          <div className={"col-4"}>
            <label>
              Basic
              <select
                className={"custom-select"}
                value={selectedBasicSkill}
                onChange={event => setSelectedBasicSkill(event.target.value)}
              >
                <option value={0}>0</option>
                <option value={1}>I</option>
                <option value={2}>II</option>
                <option value={3}>III</option>
                <option value={4}>IV</option>
                <option value={5}>V</option>
              </select>
            </label>
          </div>
          <div className={"col-4"}>
            <label>
              Advanced
              <select
                className={"custom-select"}
                value={selectedAdvancedSkill}
                onChange={event => setSelectedAdvancedSkill(event.target.value)}
              >
                <option value={0}>0</option>
                <option value={1}>I</option>
                <option value={2}>II</option>
                <option value={3}>III</option>
                <option value={4}>IV</option>
                <option value={5}>V</option>
              </select>
            </label>
          </div>
          <div className={"col-4"}>
            <label>
              Expert
              <select
                className={"custom-select"}
                value={selectedExpertSkill}
                onChange={event => setSelectedExpertSkill(event.target.value)}
              >
                <option value={0}>0</option>
                <option value={1}>I</option>
                <option value={2}>II</option>
                <option value={3}>III</option>
                <option value={4}>IV</option>
                <option value={5}>V</option>
              </select>
            </label>
          </div>
        </div>
        <h2>Your goal</h2>
        <div className={"row"}>
          <div className={"col-md-8"}>
            <label>
              Ship class
              <select
                className={"custom-select"}
                value={selectedShipClass}
                onChange={event => setSelectedShipClass(event.target.value)}
              >
                <option value={"Frigate (T4, T5)"}>Frigate (T4, T5)</option>
                <option value={"Frigate (T5 Covert Ops)"}>Frigate (T5 Covert Ops)</option>
                <option value={"Frigate (T6, T7, T8)"}>Frigate (T6, T7, T8)</option>
                <hr/>
                <option value={"Destroyer (T4)"}>Destroyer (T4)</option>
                <option value={"Destroyer (T5)"}>Destroyer (T5)</option>
                <option value={"Destroyer (T6)"}>Destroyer (T6)</option>
                <option value={"Destroyer (T7)"}>Destroyer (T7)</option>
                <hr/>
                <option value={"Cruiser (T5)"}>Cruiser (T5)</option>
                <option value={"Cruiser (T6, T7, T8)"}>Cruiser (T6, T7, T8)</option>
                <hr/>
                <option value={"Combat Battlecruiser (T7)"}>Combat Battlecruiser (T7)</option>
                <option value={"Combat Battlecruiser (T8)"}>Combat Battlecruiser (T8)</option>
                <option value={"Assault Battlecruiser (T8)"}>Assault Battlecruiser (T8)</option>
                <hr/>
                <option value={"Faction Frigate"}>Faction Frigate</option>
                <option value={"Faction Cruiser"}>Faction Cruiser</option>
                <option value={"Faction Battleship"}>Faction Battleship</option>
              </select>
            </label>
          </div>
          <div className={"col-md-4"}>
            <label>
              Debris used
              <input
                className={"number-input small"}
                type={"number"}
                step={1}
                min={1}
                max={maxDebris}
                value={debrisCount}
                onChange={event => setDebrisCount(event.target.value)}
              />
              <span className={"slash"}>/ {maxDebris}</span>
            </label>
          </div>
        </div>
        <h2>Results</h2>
        <div className={"row"}>
          <div className={"col-6"}>
            <label>
              Chance of success
              <p className={"result-text"}>{Math.round(calculateSuccessChance())} %</p>
            </label>
          </div>
          <div className={"col-6"}>
            <label>
              Bonus from skills
              <p className={"result-text"}>+ {successMultiplier} %</p>
            </label>
          </div>
        </div>
        <h2>Financial stuff</h2>
        <div className={"row"}>
          <div className={"col-6"}>
            <label>
              Cost for 1 debris
              <input
                className={"number-input"}
                type={"number"}
                max={maxDebris}
                value={debrisCost}
                onChange={event => setDebrisCost(event.target.value)}
              />
            </label>
          </div>
          <div className={"col-6"}>
            <label>
              Other expenses
              <input
                className={"number-input"}
                type={"number"}
                max={maxDebris}
                value={otherExpenses}
                onChange={event => setOtherExpenses(event.target.value)}
              />
            </label>
          </div>
          <div className={"col-md-7"}>
            <label>
              Cost per successful run
              <p className={"cost-per-run"}>
                {researchCost} ISK
              </p>
            </label>
          </div>
        </div>
      </div>
    </main>
  )
}

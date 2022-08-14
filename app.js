// DOM Elements
const allSections = document.querySelectorAll('.section:not(.row-top)');
const topSections = document.querySelectorAll('.section.row-top');
const resetButton = document.querySelector('.reset');
const statusSpan = document.querySelector('.status');


// columns
const column0 = [allSections[35], allSections[28], allSections[21], allSections[14], allSections[7], allSections[0], topSections[0]];
const column1 = [allSections[36], allSections[29], allSections[22], allSections[15], allSections[8], allSections[1], topSections[1]];
const column2 = [allSections[37], allSections[30], allSections[23], allSections[16], allSections[9], allSections[2], topSections[2]];
const column3 = [allSections[38], allSections[31], allSections[24], allSections[17], allSections[10], allSections[3], topSections[3]];
const column4 = [allSections[39], allSections[32], allSections[25], allSections[18], allSections[11], allSections[4], topSections[4]];
const column5 = [allSections[40], allSections[33], allSections[26], allSections[19], allSections[12], allSections[5], topSections[5]];
const column6 = [allSections[41], allSections[34], allSections[27], allSections[20], allSections[13], allSections[6], topSections[6]];
const columns = [column0, column1, column2, column3, column4, column5, column6];



// rows
const topRow = [topSections[0], topSections[1], topSections[2], topSections[3], topSections[4], topSections[5], topSections[6]];
const row0 = [allSections[0], allSections[1], allSections[2], allSections[3], allSections[4], allSections[5], allSections[6]];
const row1 = [allSections[7], allSections[8], allSections[9], allSections[10], allSections[11], allSections[12], allSections[13]];
const row2 = [allSections[14], allSections[15], allSections[16], allSections[17], allSections[18], allSections[19], allSections[20]];
const row3 = [allSections[21], allSections[22], allSections[23], allSections[24], allSections[25], allSections[26], allSections[27]];
const row4 = [allSections[28], allSections[29], allSections[30], allSections[31], allSections[32], allSections[33], allSections[34]];
const row5 = [allSections[35], allSections[36], allSections[37], allSections[38], allSections[39], allSections[40], allSections[41]];
const rows = [row0, row1, row2, row3, row4, row5, topRow];



//variables
let gameIsLive = true;
let yellowIsNext = true;


//Functions

const getClassListArray = (section) => {
    const classList = section.classList;
    return[...classList]
}

const getSectionLocation = (section) => {
    const classList = getClassListArray(section)

    const rowClass = classList.find(className => className.includes('row'))
    const colClass = classList.find(className => className.includes('col'))
    const rowIndex = rowClass[4]
    const colIndex = colClass[4]
    const rowNumber = parseInt(rowIndex, 10)
    const colNumber = parseInt(colIndex, 10)

    return [rowNumber, colNumber]
}

const getFirstOpenSectionForColumn= (colIndex) => {
    const column = columns[colIndex]
    const columnWithoutTop = column.slice(0, 6)

    for(const section of columnWithoutTop ){
        const  classList= getClassListArray(section)
        if(!classList.includes('yellow') && !classList.includes('red')){
            return section
        }
    }
    return null
}

const clearColorFromTop =(colIndex) => {
    const topSection = topSections[colIndex];
    topSection.classList.remove('yellow');
    topSection.classList.remove('red');
}

const getColorOfSection = (section) => {
    const classList = getClassListArray(section)
    if (classList.includes('yellow')) return 'yellow'
    if (classList.includes('red')) return 'red'
    return null;
}

const checkWinningSections = (sections) => {
    if (sections.length < 4) return false;

    gameIsLive = false;
    for (const section of sections) {
            section.classList.add('win')
        }
        statusSpan.textContent = `${yellowIsNext ? 'Yellow' : 'Red'} Has Won!!!`
        return true;
}

const checkStatusOfGame = (section) => {
    const color = getColorOfSection(section)
    if(!color) return
    const [rowIndex, colIndex] = getSectionLocation(section)

    // check horizontally
    let winningSections = [section]
    let rowToCheck = rowIndex
    let colToCheck = colIndex -1
    while(colToCheck >= 0) {
        const sectionToCheck = rows[rowToCheck][colToCheck]
        if(getColorOfSection(sectionToCheck) ===color) {
            winningSections.push(sectionToCheck)
            colToCheck--;
        }else {
         break
        }
    } 
    colToCheck= colIndex +1;
    while(colToCheck <= 6) {
        const sectionToCheck = rows[rowToCheck][colToCheck]
        if(getColorOfSection(sectionToCheck) ===color) {
            winningSections.push(sectionToCheck)
            colToCheck++;
        }else {
         break
        }
    }
    let isWinningCombo = checkWinningSections(winningSections)
    if(isWinningCombo) return;


    // check Vertically
    winningSections = [section]
    rowToCheck = rowIndex -1
    colToCheck = colIndex
    while (rowToCheck >= 0) {
        const sectionToCheck = rows[rowToCheck][colToCheck]
        if(getColorOfSection(sectionToCheck) ===color) {
            winningSections.push(sectionToCheck)
            rowToCheck--;
        }else {
         break
        }
    }
    rowToCheck = rowIndex +1;
    while(rowToCheck <= 5) {
        const sectionToCheck = rows[rowToCheck][colToCheck]
        if(getColorOfSection(sectionToCheck) ===color) {
            winningSections.push(sectionToCheck)
            rowToCheck++;
        }else {
         break
        }
    }
    isWinningCombo = checkWinningSections(winningSections)
    if(isWinningCombo) return;


       // check Diagonally /Bottom left to top right
    winningSections = [section]
    rowToCheck = rowIndex +1
    colToCheck = colIndex -1
    while (colToCheck >= 0 && rowToCheck <= 5) {
        const sectionToCheck = rows[rowToCheck][colToCheck]
        if(getColorOfSection(sectionToCheck) ===color) {
            winningSections.push(sectionToCheck)
            rowToCheck++;
            colToCheck--;
        }else {
        break
        }
    } 
    rowToCheck = rowIndex - 1;
    colToCheck = colIndex + 1;
    while(colToCheck <= 6 && rowToCheck >= 0 ) {
        const sectionToCheck = rows[rowToCheck][colToCheck]
        if(getColorOfSection(sectionToCheck) ===color) {
            winningSections.push(sectionToCheck)
            rowToCheck--;
            colToCheck++;
        }else {
        break
        }
    }
    isWinningCombo = checkWinningSections(winningSections)
    if(isWinningCombo) return;


    // check Diagonally /Bottom right to top left
    winningSections = [section]
    rowToCheck = rowIndex - 1
    colToCheck = colIndex - 1
    while (colToCheck >= 0 && rowToCheck >= 0) {
        const sectionToCheck = rows[rowToCheck][colToCheck]
        if(getColorOfSection(sectionToCheck) ===color) {
            winningSections.push(sectionToCheck)
                rowToCheck--;
                colToCheck--;
            }else {
            break
        }
    } 
    rowToCheck = rowIndex + 1;
    colToCheck = colIndex + 1;
    while(colToCheck <= 6 && rowToCheck <= 5 ) {
        const sectionToCheck = rows[rowToCheck][colToCheck]
        if(getColorOfSection(sectionToCheck) ===color) {
            winningSections.push(sectionToCheck)
                rowToCheck++;
                colToCheck++;
            }else {
            break
        }
    }
    isWinningCombo = checkWinningSections(winningSections)
    if(isWinningCombo) return;

    //Check to see if we have a tie'
    const rowsWithoutTop = rows.slice(0, 6)
    for(const row of rowsWithoutTop ){
      for (const section of row) {
        const classList = getClassListArray(section)
        if(!classList.includes('yellow') && !classList.includes('red')){
            return;
        }
      }
    }

    gameIsLive = false;
    statusSpan.textContent = 'Game Is A Tie!!!'
}

//Event Handler
const handleSectionMouseOver = (e) => {
    if (!gameIsLive)return;
    const section = e.target;
    const [rowIndex, colIndex] = getSectionLocation(section)

    const topSection = topSections[colIndex]
    topSection.classList.add(yellowIsNext ? "yellow" : 'red')
}

const handleSectionMouseOut = (e) => {
    const section = e.target;
    const [rowIndex, colIndex] = getSectionLocation(section)
    clearColorFromTop(colIndex)
}

const handleSectionClick = (e) => {
    if(!gameIsLive) return
    const section = e.target;
    const [rowIndex, colIndex] = getSectionLocation(section);
    const openSection = getFirstOpenSectionForColumn(colIndex);

    if (!openSection) return;

    openSection.classList.add(yellowIsNext ? 'yellow' : 'red')
    checkStatusOfGame(openSection)

    yellowIsNext = !yellowIsNext
    clearColorFromTop(colIndex)
    if (gameIsLive) {
     const topSections = topSections[colIndex]
     topSection.classList.add(yellowIsNext ? 'yellow' : 'red')
    }
};

//adding Event Listeners
for (const row of rows) {
    for (const section of row){
        section.addEventListener('mouseover', handleSectionMouseOver)
        section.addEventListener('mouseout', handleSectionMouseOut)
        section.addEventListener('click', handleSectionClick)
    }
}

resetButton.addEventListener('click', () => {
    for (const row of rows) {
        for (const section of row) {
            section.classList.remove('red')
            section.classList.remove('yellow')
            section.classList.remove('win')
        }
    }
    gameIsLive = true
    yellowIsNext = true
    statusSpan.textContent = '';
})

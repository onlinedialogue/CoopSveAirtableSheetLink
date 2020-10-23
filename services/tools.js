async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const getSend = (socket) => {
  let send;
  if (socket) {
    send = (msg, value) => {
      socket.emit(msg, value);
    }
  } else {
    send = (msg, value) => {
      const cleanValue = value.match(/^.+>(.+)<.+$/)[1];
      console.log(cleanValue);
    }
  }
  return send;
}

const getCurrentDate = () => {
  const d = new Date();
  return d.getDate() + '/' + 
        (d.getMonth() + 1) + "/" +
        d.getFullYear() + " " + 
        (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':' + 
        (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
}

const makeToArray = str => {
  const temp = str.split(",");
  return temp.map(e => e.trim());
};

const makeToString = array => {
  let temp = '';

  array.forEach((e, i) => {
    if (i+1 === array.length) {
      temp += e;
    } else {
      temp += e + ', '
    }
  });

  return temp;
};

module.exports.asyncForEach = asyncForEach;
module.exports.getSend = getSend;
module.exports.getCurrentDate = getCurrentDate;
module.exports.makeToArray = makeToArray;
module.exports.makeToString = makeToString;
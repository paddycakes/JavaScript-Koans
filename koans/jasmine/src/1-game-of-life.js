function isCellAliveInNextGeneration(isCellAlive, numberOfNeighbours) {
  return isCellAlive && numberOfNeighbours === 2 || numberOfNeighbours === 3;
  //if (isCellAlive) {
  //  if (numberOfNeighbours > 3) return false;
  //  return numberOfNeighbours > 1;
  //} else {
  //  return numberOfNeighbours === 3;
  //}
}

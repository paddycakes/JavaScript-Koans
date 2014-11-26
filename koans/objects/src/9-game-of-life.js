var SAMURAIPRINCIPLE = {
	isCellAlive: function (isCellAlive) {
		return isCellAlive
	},
	hasTwoNeighbours: function(numberOfNeighbours) {
		return numberOfNeighbours === 2;
	},
	hasThreeNeighbours: function(numberOfNeighbours) {
		return numberOfNeighbours === 3;
	}
};
var SAMURAIPRINCIPLE2 = {
	principle: function(isCellAlive, numberOfNeighbours) {
		return isCellAlive && numberOfNeighbours === 2 || numberOfNeighbours === 3;
	}
}
SAMURAIPRINCIPLE.isCellAliveInNextGeneration = function (isCellAlive, numberOfNeighbours) {
/*	return SAMURAIPRINCIPLE.isCellAlive(isCellAlive)
			&& SAMURAIPRINCIPLE.hasTwoNeighbours(numberOfNeighbours)
			|| SAMURAIPRINCIPLE.hasThreeNeighbours(numberOfNeighbours);*/
	return SAMURAIPRINCIPLE2.principle(isCellAlive, numberOfNeighbours);
};

var ColourPalette = {
	red: 0xFF0000,
	green: 0x00FF00,
	blue: 0x00000FF
}
function getColour(name) {
	return ColourPalette[name];
}


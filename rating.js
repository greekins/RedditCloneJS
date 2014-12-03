module.exports = function Rating() {
    this.value = 0;
    var votersUp = [];
    var votersDown = [];
    var self = this;
    
    this._up = function(userId) {
        if(votersDown[userId]) {
            votersDown[userId] = false;
            self.value++;
        }
        else if (!votersUp[userId]) {
            self.value++;
            votersUp[userId] = true;
        }
        return self.value;
    };
    
    this._down = function (userId) {
        if(votersUp[userId]) {
            votersUp[userId] = false;
            self.value--;
        }
        else if (!votersDown[userId]) {
            self.value--;
            votersDown[userId] = true;
        }
        return self.value;
    };
};




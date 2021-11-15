class Stimulus {
    
    orientations=[0, 90];
    adjust = [-22.5, 22.5];
    shapes = ['circle', 'square'];
    colors = ['green', 'red'];
    
    constructor(distractor=false, shape='circle', orientation=0, color='', position=[0, 0]) {
        this.distractor = distractor;
        this.shape = shape;
        // this.orientation = this.orientations[Math.floor(Math.random()*this.orientations.length)]
        this.orientation = orientation
        this.color = color
        this.position = position
    }

    set current(shape) {
        this.shape = shape;
        this.orientation = this.orientations[Math.floor(Math.random() * this.orientations.length)]
    }
    
    print() {
        return `distractor: ${this.distractor}\nshape: ${this.shape}\norientation: ${this.orientation}\ncolor: ${this.color}\ncoordinate: ${this.position}`
    }
    
}

export default Stimulus

// let stimulus = new Stimulus();
// stimulus.shape = 'square';
// console.log(stimulus.print())
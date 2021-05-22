import React from 'react';
import{Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';

function RenderDirectoryItem({campsite,onClick}){
    return(
        <Card onClick={()=>onClick(campsite.id)}>
            <CardImg width="100%" src={campsite.image} alt={campsite.name} />
            <CardImgOverlay>
                <CardTitle>{campsite.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
}

function Directory (props){

    const directory=props.campsites.map(campsite=>{
        return(
            <div key={campsite.id} className="col-md-5 m-1">
                <RenderDirectoryItem campsite={campsite} onClick={props.onClick} />
            </div>
        );
    });

    return(
        <div className="container">
            <div className="row">
                {directory}
            </div>
        
        </div>
    );
}


/*Class Practice*/
/*
class ExampleParentComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            number:333
        }
    }
    render(){
        return <ExampleChildComponent number={this.state.number} greeting="Hello World" />;
    }
}

class ExampleChildComponent extends Component{
    render(){
        return <div>{this.props.number}{this.props.greeting}</div>
    }
}
*/
export default Directory;
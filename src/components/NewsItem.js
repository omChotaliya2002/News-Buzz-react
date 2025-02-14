import React from "react";

const NewsItem = (props) => {

    let {title, description,imageUrl,newsUrl,author,date, source} = props;


    return (
      <div>
            <div className="card border-dark mb-5">
            <span className="position-absolute top-0 end-1 badge rounded-pill bg-dark" 
              style={{maxWidth:"40%",overflow:"hidden", textOverflow:"ellipsis",
              whiteSpace:"nowrap", zIndex:"1", margin:"5px", color:"white"}}> {source} </span>

            <img src= {!imageUrl?"https://images.wsj.net/im-56647844":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title} </h5>

                <p className="card-text">{description}</p>

                <div className="card-footer my-3">
                  <strong><p className="text-body-secondary"> by {!author?"Unknown" : author}, <br/> on {new Date(date).toGMTString()} </p></strong>
               </div>

                <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>

      </div>
    )
}

export default NewsItem;


 // const formatDateTime = (dateTimeString) => {            // to manage the format of date and time
    //   return dateTimeString.replace("T",", at ").replace("Z"," ");
    // };
<img className="card-img-top" alt="..." src="https://www.trueachievements.com/imgs/156110/xbox-game-pass-february-2025--wave-1-announced.jpg"></img>
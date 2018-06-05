


const vFilter = {
  timeFilter : function(value,time,geshi){
    // let date = new Date()
    // date.setTime(new Date(value).getTime())
    // return date.toISOString()
    
    let date = new Date(value)
    var year = date.getFullYear(),
        month = date.getMonth() < 10 ? '0' + ( date.getMonth()- 0 + 1 ) : date.getMonth()- 0 + 1,
        day = date.getDate()< 10 ? '0' + date.getDate() : date.getDate() ,
        hours = date.getHours()< 10 ? '0' + date.getHours() : date.getHours() ,
        min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() ,
        sec = date.getSeconds()< 10 ? '0' + date.getSeconds() : date.getSeconds() 
        if(!geshi){
            if(!time){
                return year +'-'+ month +'-'+ day    
            }else{
                return year +'-'+ month +'-'+ day + ' ' +  hours + ':' + min +':'+ sec
            }
        }else{
            return year +geshi+ month +geshi+ day + ' ' +  hours + ':' + min +':'+ sec
        }
   
   
  }
}

  
export default vFilter
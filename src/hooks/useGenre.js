export function useGenre(arr) {
   if (arr.length === 0){
      return ''
   }

   return arr.reduce(function(acc,curr){
        return acc+','+curr.id
   },'').substr(1)
}


export type SessionCounts={assignments:string[];deliveries:string[];verdicts:string[]};
export const emptyCounts=():SessionCounts=>({assignments:[],deliveries:[],verdicts:[]});
export function recordMilestone(counts:SessionCounts,key:keyof SessionCounts,id:string,verified=true):SessionCounts{
 if(!verified||!id||counts[key].includes(id))return counts;
 return {...counts,[key]:[...counts[key],id]};
}
export function offlineReceipt(taskId:string,mandateHash:string,evidenceHash:string,sourceCount:number,minSources:number){
 return {mode:'offline-fixture',taskId,mandateHash,evidenceHash,networkTransaction:null,finalized:false,expectedOutcome:sourceCount<minSources?'INCONCLUSIVE':'NOT_EVALUATED',reason:sourceCount<minSources?'Fewer pinned sources than required. This is a local precondition check, not a GenLayer verdict.':'Source sufficiency and report accuracy require live independent GenLayer review. No verdict was computed.'};
}

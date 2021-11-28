export interface Ticket {
    id: Number;
    status : String;
    subject : String;
    requester_id : Number;
    created_at : Date;
    type : String;
    priority : String;
    assignee_id : Number;
}
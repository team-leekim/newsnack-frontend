export type ReactionType = 'HAPPY' | 'SURPRISED' | 'SAD' | 'ANGRY' | 'EMPATHY';

export interface CreateReactionRequest {
  type: ReactionType;
}
